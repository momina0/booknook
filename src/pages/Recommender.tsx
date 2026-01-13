import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, BookOpen, Search, Loader2, Library, Wand2, Cat, Heart, Star } from "lucide-react";
import { Book, OpenLibraryBook } from "@/types/book";
import { motion, AnimatePresence } from "framer-motion";
import { WatercolorBlob } from "@/components/decorations/WatercolorBlob";
import { AnimatedFloatingIcon } from "@/components/decorations/AnimatedFloatingIcon";

const GENRES = [
  "Fiction",
  "Non-Fiction",
  "Mystery",
  "Romance",
  "Science Fiction",
  "Fantasy",
  "Thriller",
  "Biography",
  "Self-Help",
  "History",
];

interface Recommendation {
  title: string;
  author: string;
  reason: string;
  coverUrl?: string;
}

export default function Recommender() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [customPrompt, setCustomPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [mode, setMode] = useState<"bookshelf" | "genre" | "custom">("bookshelf");

  useEffect(() => {
    if (user) fetchBooks();
  }, [user]);

  const fetchBooks = async () => {
    const { data } = await supabase
      .from("books")
      .select("*")
      .eq("user_id", user!.id);
    if (data) setBooks(data as Book[]);
  };

  const searchOpenLibrary = async (query: string): Promise<OpenLibraryBook[]> => {
    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=5`
      );
      const data = await res.json();
      return data.docs || [];
    } catch {
      return [];
    }
  };

  const getRecommendations = async () => {
    setLoading(true);
    setRecommendations([]);

    try {
      let prompt = "";

      if (mode === "bookshelf" && books.length > 0) {
        const bookList = books
          .slice(0, 10)
          .map((b) => `"${b.title}" by ${b.author} (${b.genre || "unknown genre"}, rated ${b.rating || "unrated"}/5)`)
          .join("; ");
        prompt = `Based on these books I've read: ${bookList}. Recommend 10 books I might enjoy. For each, give the title, author, and a brief reason why I'd like it based on my reading history.`;
      } else if (mode === "genre" && selectedGenre) {
        prompt = `Recommend 10 highly-rated ${selectedGenre} books. For each, give the title, author, and a brief description of why it's great.`;
      } else if (mode === "custom" && customPrompt) {
        prompt = `${customPrompt}. Recommend 10 books that match this request. For each, give the title, author, and a brief reason.`;
      } else {
        toast({
          title: "Missing input",
          description: "Please select a mode and provide the required input",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      const response = await supabase.functions.invoke("recommend-books", {
        body: { prompt },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      const aiRecommendations = response.data.recommendations as Recommendation[];

      // Enrich with OpenLibrary covers
      const enriched = await Promise.all(
        aiRecommendations.map(async (rec) => {
          const searchResults = await searchOpenLibrary(`${rec.title} ${rec.author}`);
          const match = searchResults[0];
          return {
            ...rec,
            coverUrl: match?.cover_i
              ? `https://covers.openlibrary.org/b/id/${match.cover_i}-M.jpg`
              : undefined,
          };
        })
      );

      setRecommendations(enriched);
    } catch (error) {
      console.error("Recommendation error:", error);
      toast({
        title: "Error",
        description: "Failed to get recommendations. Please try again.",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  const addToWantToRead = async (rec: Recommendation) => {
    const { error } = await supabase.from("books").insert({
      user_id: user!.id,
      title: rec.title,
      author: rec.author,
      cover_url: rec.coverUrl || null,
      status: "want-to-read",
    });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add book",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Added!",
        description: `${rec.title} added to your want-to-read list`,
      });
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-4 relative">
        {/* Watercolor blobs */}
        <WatercolorBlob color="#FFB6D9" className="top-0 right-0" size="xl" opacity={0.25} />
        <WatercolorBlob color="#E5D4FF" className="top-1/3 left-0" size="lg" opacity={0.2} delay={0.5} />
        <WatercolorBlob color="#D4B4F1" className="bottom-20 right-10" size="md" opacity={0.2} delay={1} />
        
        {/* Floating icons */}
        <AnimatedFloatingIcon icon={Wand2} className="top-0 right-5" color="#FF8FAB" size={24} />
        <AnimatedFloatingIcon icon={Sparkles} className="top-16 right-0" color="#D4B4F1" size={20} delay={0.5} />
        <AnimatedFloatingIcon icon={Star} className="top-1/3 right-5" color="#C39FE8" size={16} delay={1} />
        
        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ rotate: [0, -5, 5, 0], y: [0, -3, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Cat className="h-10 w-10 icon-pink" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-[#FF8FAB] to-[#C39FE8] bg-clip-text text-transparent">
              AI Book Recommender
            </h1>
            <p className="text-muted-foreground font-body text-sm">
              Get personalized recommendations powered by AI magic
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="h-6 w-6 icon-purple" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass-card-pink border-0 pink-shadow">
            <CardHeader className="py-3">
              <CardTitle className="text-base font-display bg-gradient-to-r from-[#FF8FAB] to-[#C39FE8] bg-clip-text text-transparent">
                How would you like recommendations?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={mode === "bookshelf" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMode("bookshelf")}
                  className={mode === "bookshelf" 
                    ? "bg-gradient-to-r from-[#FF8FAB] to-[#FFB6D9] text-white font-cute rounded-full border-0" 
                    : "border-[#FFB6D9]/50 text-[#FF8FAB] hover:bg-[#FFB6D9]/20 font-cute rounded-full"}
                >
                  <Library className="h-3.5 w-3.5 mr-1" /> Based on My Bookshelf
                </Button>
                <Button
                  variant={mode === "genre" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMode("genre")}
                  className={mode === "genre" 
                    ? "bg-gradient-to-r from-[#C39FE8] to-[#D4B4F1] text-white font-cute rounded-full border-0" 
                    : "border-[#D4B4F1]/50 text-[#C39FE8] hover:bg-[#D4B4F1]/20 font-cute rounded-full"}
                >
                  By Genre
                </Button>
                <Button
                  variant={mode === "custom" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMode("custom")}
                  className={mode === "custom" 
                    ? "bg-gradient-to-r from-[#D4B4F1] to-[#E5D4FF] text-white font-cute rounded-full border-0" 
                    : "border-[#E5D4FF]/50 text-[#D4B4F1] hover:bg-[#E5D4FF]/20 font-cute rounded-full"}
                >
                  <Wand2 className="h-3.5 w-3.5 mr-1" /> Custom Request
                </Button>
              </div>

              {mode === "bookshelf" && (
                <div className="p-4 bg-gradient-to-r from-[#FFB6D9]/20 to-[#D4B4F1]/20 rounded-xl border border-[#FFB6D9]/30">
                  {books.length === 0 ? (
                    <p className="text-muted-foreground font-body text-sm flex items-center gap-2">
                      <Cat className="h-4 w-4 icon-pink" />
                      Add some books to your shelf first to get personalized recommendations!
                    </p>
                  ) : (
                    <p className="text-muted-foreground font-body text-sm">
                      We'll analyze your {books.length} books and find similar reads you'll love!
                    </p>
                  )}
                </div>
              )}

              {mode === "genre" && (
                <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                  <SelectTrigger className="w-full sm:w-56 border-[#D4B4F1]/50 focus:border-[#C39FE8] h-10 text-sm rounded-full bg-white/50">
                    <SelectValue placeholder="Select a genre" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#D4B4F1]/50 rounded-xl">
                    {GENRES.map((g) => (
                      <SelectItem key={g} value={g} className="font-body text-sm">
                        {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {mode === "custom" && (
                <Textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="E.g., 'Books like Harry Potter for adults' or 'Cozy mysteries set in small towns'"
                  rows={2}
                  className="border-[#E5D4FF]/50 focus:border-[#D4B4F1] focus:ring-[#E5D4FF]/30 font-body text-sm rounded-xl bg-white/50"
                />
              )}

              <Button
                onClick={getRecommendations}
                disabled={loading || (mode === "bookshelf" && books.length === 0)}
                size="sm"
                className="pink-btn pink-shadow"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Finding books...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4 mr-2" /> Get Recommendations
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recommendations */}
        <AnimatePresence>
          {recommendations.length > 0 && (
            <motion.div 
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Cat className="h-8 w-8 icon-pink" />
                </motion.div>
                <h2 className="text-lg font-display font-semibold bg-gradient-to-r from-[#FF8FAB] to-[#C39FE8] bg-clip-text text-transparent">
                  Recommended for You
                </h2>
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="h-5 w-5 icon-purple" />
                </motion.div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {recommendations.map((rec, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="glass-card-pink border-0 pink-shadow overflow-hidden group">
                      <motion.div 
                        className="flex gap-3 p-4"
                        whileHover={{ scale: 1.02 }}
                      >
                        {rec.coverUrl ? (
                          <img
                            src={rec.coverUrl}
                            alt={rec.title}
                            className="w-16 h-24 object-cover rounded-xl flex-shrink-0 border border-[#FFB6D9]/50"
                          />
                        ) : (
                          <div className="w-16 h-24 bg-gradient-to-br from-[#FFB6D9]/30 to-[#D4B4F1]/30 rounded-xl flex items-center justify-center flex-shrink-0">
                            <BookOpen className="h-6 w-6 icon-pink" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-cute font-semibold text-foreground line-clamp-2 text-sm">
                            {rec.title}
                          </h3>
                          <p className="text-xs text-muted-foreground mb-1 font-body">{rec.author}</p>
                          <p className="text-xs text-muted-foreground line-clamp-3 font-body">
                            {rec.reason}
                          </p>
                        </div>
                      </motion.div>
                      <div className="px-4 pb-4">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => addToWantToRead(rec)}
                          className="w-full purple-btn text-xs"
                        >
                          <Heart className="h-3 w-3 mr-1" />
                          Add to Want to Read
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MainLayout>
  );
}
