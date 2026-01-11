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
import { Sparkles, BookOpen, Search, Loader2 } from "lucide-react";
import { Book, OpenLibraryBook } from "@/types/book";

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
        prompt = `Based on these books I've read: ${bookList}. Recommend 5 books I might enjoy. For each, give the title, author, and a brief reason why I'd like it based on my reading history.`;
      } else if (mode === "genre" && selectedGenre) {
        prompt = `Recommend 5 highly-rated ${selectedGenre} books. For each, give the title, author, and a brief description of why it's great.`;
      } else if (mode === "custom" && customPrompt) {
        prompt = `${customPrompt}. Recommend 5 books that match this request. For each, give the title, author, and a brief reason.`;
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
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            AI Book Recommender
          </h1>
          <p className="text-muted-foreground mt-1">
            Get personalized recommendations powered by AI and OpenLibrary
          </p>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">How would you like recommendations?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={mode === "bookshelf" ? "default" : "outline"}
                onClick={() => setMode("bookshelf")}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Based on My Bookshelf
              </Button>
              <Button
                variant={mode === "genre" ? "default" : "outline"}
                onClick={() => setMode("genre")}
              >
                <Search className="h-4 w-4 mr-2" />
                By Genre
              </Button>
              <Button
                variant={mode === "custom" ? "default" : "outline"}
                onClick={() => setMode("custom")}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Custom Request
              </Button>
            </div>

            {mode === "bookshelf" && (
              <div className="p-4 bg-muted rounded-lg">
                {books.length === 0 ? (
                  <p className="text-muted-foreground">
                    Add some books to your shelf first to get personalized recommendations!
                  </p>
                ) : (
                  <p className="text-muted-foreground">
                    We'll analyze your {books.length} books and find similar reads you'll love.
                  </p>
                )}
              </div>
            )}

            {mode === "genre" && (
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger className="w-full sm:w-64">
                  <SelectValue placeholder="Select a genre" />
                </SelectTrigger>
                <SelectContent>
                  {GENRES.map((g) => (
                    <SelectItem key={g} value={g}>
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
                rows={3}
              />
            )}

            <Button
              onClick={getRecommendations}
              disabled={loading || (mode === "bookshelf" && books.length === 0)}
              className="w-full sm:w-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Finding books...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Get Recommendations
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-serif font-semibold text-foreground">
              Recommended for You
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recommendations.map((rec, i) => (
                <Card key={i} className="bg-card border-border overflow-hidden">
                  <div className="flex gap-4 p-4">
                    {rec.coverUrl ? (
                      <img
                        src={rec.coverUrl}
                        alt={rec.title}
                        className="w-20 h-28 object-cover rounded-lg flex-shrink-0"
                      />
                    ) : (
                      <div className="w-20 h-28 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                        <BookOpen className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif font-semibold text-card-foreground line-clamp-2">
                        {rec.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">{rec.author}</p>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {rec.reason}
                      </p>
                    </div>
                  </div>
                  <div className="px-4 pb-4">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => addToWantToRead(rec)}
                      className="w-full"
                    >
                      Add to Want to Read
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
