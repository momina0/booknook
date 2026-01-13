import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Search, Star, BookPlus, BookOpen, Cat, Sparkles, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { OpenLibraryBook } from "@/types/book";
import { motion } from "framer-motion";
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
  "Other",
];

export default function AddBook() {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<OpenLibraryBook[]>([]);
  const [searching, setSearching] = useState(false);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [isbn, setIsbn] = useState("");
  const [genre, setGenre] = useState("");
  const [pages, setPages] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [status, setStatus] = useState<"read" | "reading" | "want-to-read">("read");
  const [dateRead, setDateRead] = useState("");

  const searchOpenLibrary = async () => {
    if (!searchQuery.trim()) return;
    setSearching(true);
    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}&limit=8`
      );
      const data = await res.json();
      setSearchResults(data.docs || []);
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search failed",
        description: "Could not search OpenLibrary",
        variant: "destructive",
      });
    }
    setSearching(false);
  };

  const selectBook = (book: OpenLibraryBook) => {
    setTitle(book.title);
    setAuthor(book.author_name?.join(", ") || "");
    setCoverUrl(
      book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
        : ""
    );
    setIsbn(book.isbn?.[0] || "");
    if (book.subject?.length) {
      const matchedGenre = GENRES.find((g) =>
        book.subject!.some((s) => s.toLowerCase().includes(g.toLowerCase()))
      );
      if (matchedGenre) setGenre(matchedGenre);
    }
    setSearchResults([]);
    setSearchQuery("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author) {
      toast({
        title: "Missing fields",
        description: "Please enter title and author",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    const { error } = await supabase.from("books").insert({
      user_id: user!.id,
      title,
      author,
      cover_url: coverUrl || null,
      isbn: isbn || null,
      genre: genre || null,
      pages: pages ? parseInt(pages) : null,
      rating: rating > 0 ? rating : null,
      review: review || null,
      status,
      date_read: dateRead || null,
    });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add book",
        variant: "destructive",
      });
    } else {
      toast({ title: "Book added!", description: `${title} is now in your bookshelf` });
      navigate("/bookshelf");
    }
    setSaving(false);
  };

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto space-y-4 relative">
        {/* Watercolor blobs */}
        <WatercolorBlob color="#FFB6D9" className="top-0 right-0" size="lg" opacity={0.25} />
        <WatercolorBlob color="#E5D4FF" className="bottom-20 left-0" size="md" opacity={0.2} delay={0.5} />
        
        {/* Floating icons */}
        <AnimatedFloatingIcon icon={BookPlus} className="top-0 right-5" color="#FF8FAB" size={24} />
        <AnimatedFloatingIcon icon={Heart} className="top-16 right-0" color="#D4B4F1" size={18} delay={0.5} />
        
        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Cat className="h-10 w-10 icon-pink" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-[#FF8FAB] to-[#C39FE8] bg-clip-text text-transparent">
              Add a Book
            </h1>
            <p className="text-muted-foreground font-body text-sm">
              Search OpenLibrary or enter details manually
            </p>
          </div>
          <motion.div 
            className="ml-auto"
            animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="h-6 w-6 icon-purple" />
          </motion.div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass-card-pink border-0 pink-shadow">
            <CardHeader className="py-3">
              <CardTitle className="text-base font-display bg-gradient-to-r from-[#FF8FAB] to-[#C39FE8] bg-clip-text text-transparent flex items-center gap-2">
                <Search className="h-4 w-4 icon-pink" /> Search OpenLibrary
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#FF8FAB]/60" />
                  <Input
                    placeholder="Search by title or author..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && searchOpenLibrary()}
                    className="pl-10 border-[#FFB6D9]/50 focus:border-[#FF8FAB] focus:ring-[#FFB6D9]/30 text-sm h-10 rounded-full bg-white/50"
                  />
                </div>
                <Button 
                  onClick={searchOpenLibrary} 
                  disabled={searching}
                  size="sm"
                  className="pink-btn"
                >
                  {searching ? "Searching..." : "Search"}
                </Button>
              </div>

              {searchResults.length > 0 && (
                <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
                  {searchResults.map((book) => (
                    <motion.div
                      key={book.key}
                      onClick={() => selectBook(book)}
                      className="flex items-center gap-3 p-2 rounded-xl cursor-pointer hover:bg-[#FFB6D9]/20 transition-colors border border-transparent hover:border-[#FFB6D9]/50"
                      whileHover={{ scale: 1.01 }}
                    >
                      {book.cover_i ? (
                        <img
                          src={`https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`}
                          alt={book.title}
                          className="w-10 h-14 object-cover rounded-lg border border-[#FFB6D9]/50"
                        />
                      ) : (
                        <div className="w-10 h-14 bg-gradient-to-br from-[#FFB6D9]/30 to-[#D4B4F1]/30 rounded-lg flex items-center justify-center">
                          <BookOpen className="h-5 w-5 icon-pink" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-cute font-medium truncate text-foreground text-sm">{book.title}</p>
                        <p className="text-xs text-muted-foreground truncate font-body">
                          {book.author_name?.join(", ") || "Unknown author"}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-card-pink border-0 pink-shadow">
            <CardHeader className="py-3">
              <CardTitle className="text-base font-display bg-gradient-to-r from-[#FF8FAB] to-[#C39FE8] bg-clip-text text-transparent">Book Details</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="title" className="font-cute text-foreground text-sm">Title *</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Book title"
                      className="border-[#FFB6D9]/50 focus:border-[#FF8FAB] focus:ring-[#FFB6D9]/30 h-10 text-sm rounded-full bg-white/50"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="author" className="font-cute text-foreground text-sm">Author *</Label>
                    <Input
                      id="author"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="Author name"
                      className="border-[#FFB6D9]/50 focus:border-[#FF8FAB] focus:ring-[#FFB6D9]/30 h-10 text-sm rounded-full bg-white/50"
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="genre" className="font-cute text-foreground text-sm">Genre</Label>
                    <Select value={genre} onValueChange={setGenre}>
                      <SelectTrigger className="border-[#FFB6D9]/50 focus:border-[#FF8FAB] h-10 text-sm rounded-full bg-white/50">
                        <SelectValue placeholder="Select genre" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-[#FFB6D9]/50 rounded-xl">
                        {GENRES.map((g) => (
                          <SelectItem key={g} value={g} className="font-body text-sm">
                            {g}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="status" className="font-cute text-foreground text-sm">Status</Label>
                    <Select value={status} onValueChange={(v) => setStatus(v as typeof status)}>
                      <SelectTrigger className="border-[#FFB6D9]/50 focus:border-[#FF8FAB] h-10 text-sm rounded-full bg-white/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-[#FFB6D9]/50 rounded-xl">
                        <SelectItem value="read" className="font-body text-sm">Read</SelectItem>
                        <SelectItem value="reading" className="font-body text-sm">Currently Reading</SelectItem>
                        <SelectItem value="want-to-read" className="font-body text-sm">Want to Read</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="pages" className="font-cute text-foreground text-sm">Pages</Label>
                    <Input
                      id="pages"
                      type="number"
                      value={pages}
                      onChange={(e) => setPages(e.target.value)}
                      placeholder="Number of pages"
                      className="border-[#FFB6D9]/50 focus:border-[#FF8FAB] focus:ring-[#FFB6D9]/30 h-10 text-sm rounded-full bg-white/50"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="dateRead" className="font-cute text-foreground text-sm">Date Read</Label>
                    <Input
                      id="dateRead"
                      type="date"
                      value={dateRead}
                      onChange={(e) => setDateRead(e.target.value)}
                      className="border-[#FFB6D9]/50 focus:border-[#FF8FAB] focus:ring-[#FFB6D9]/30 h-10 text-sm rounded-full bg-white/50"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="font-cute text-foreground text-sm">Your Rating</Label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        type="button"
                        onClick={() => setRating(star === rating ? 0 : star)}
                        className="p-0.5"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Star
                          className={cn(
                            "h-5 w-5 transition-colors",
                            star <= rating
                              ? "fill-[#FFB6D9] text-[#FF8FAB]"
                              : "text-[#FFB6D9]/40 hover:text-[#FF8FAB]"
                          )}
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="review" className="font-cute text-foreground text-sm">Your Review</Label>
                  <Textarea
                    id="review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="What did you think about this book?"
                    rows={3}
                    className="border-[#FFB6D9]/50 focus:border-[#FF8FAB] focus:ring-[#FFB6D9]/30 font-body text-sm rounded-xl bg-white/50"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="coverUrl" className="font-cute text-foreground text-sm">Cover URL</Label>
                  <Input
                    id="coverUrl"
                    value={coverUrl}
                    onChange={(e) => setCoverUrl(e.target.value)}
                    placeholder="https://..."
                    className="border-[#FFB6D9]/50 focus:border-[#FF8FAB] focus:ring-[#FFB6D9]/30 h-10 text-sm rounded-full bg-white/50"
                  />
                  {coverUrl && (
                    <img
                      src={coverUrl}
                      alt="Cover preview"
                      className="w-20 h-28 object-cover rounded-xl mt-2 border border-[#FFB6D9]/50 pink-shadow"
                    />
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full pink-btn pink-shadow" 
                  disabled={saving}
                >
                  {saving ? (
                    <motion.span
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      Adding...
                    </motion.span>
                  ) : (
                    <>
                      <BookPlus className="h-4 w-4 mr-2" />
                      Add to Bookshelf
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </MainLayout>
  );
}
