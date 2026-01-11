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
import { Search, Star, BookPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { OpenLibraryBook } from "@/types/book";

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
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <BookPlus className="h-8 w-8 text-primary" />
            Add a Book
          </h1>
          <p className="text-muted-foreground mt-1">
            Search OpenLibrary or enter details manually
          </p>
        </div>

        {/* Search */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Search OpenLibrary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title or author..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && searchOpenLibrary()}
                  className="pl-10"
                />
              </div>
              <Button onClick={searchOpenLibrary} disabled={searching}>
                {searching ? "Searching..." : "Search"}
              </Button>
            </div>

            {searchResults.length > 0 && (
              <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
                {searchResults.map((book) => (
                  <div
                    key={book.key}
                    onClick={() => selectBook(book)}
                    className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-muted transition-colors"
                  >
                    {book.cover_i ? (
                      <img
                        src={`https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`}
                        alt={book.title}
                        className="w-10 h-14 object-cover rounded"
                      />
                    ) : (
                      <div className="w-10 h-14 bg-secondary rounded flex items-center justify-center text-xs">
                        📚
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{book.title}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {book.author_name?.join(", ") || "Unknown author"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Form */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Book Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Book title"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author">Author *</Label>
                  <Input
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Author name"
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="genre">Genre</Label>
                  <Select value={genre} onValueChange={setGenre}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                    <SelectContent>
                      {GENRES.map((g) => (
                        <SelectItem key={g} value={g}>
                          {g}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={status} onValueChange={(v) => setStatus(v as typeof status)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="read">Read</SelectItem>
                      <SelectItem value="reading">Currently Reading</SelectItem>
                      <SelectItem value="want-to-read">Want to Read</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pages">Pages</Label>
                  <Input
                    id="pages"
                    type="number"
                    value={pages}
                    onChange={(e) => setPages(e.target.value)}
                    placeholder="Number of pages"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateRead">Date Read</Label>
                  <Input
                    id="dateRead"
                    type="date"
                    value={dateRead}
                    onChange={(e) => setDateRead(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Your Rating</Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star === rating ? 0 : star)}
                      className="p-1"
                    >
                      <Star
                        className={cn(
                          "h-6 w-6 transition-colors",
                          star <= rating
                            ? "fill-primary text-primary"
                            : "text-muted-foreground hover:text-primary"
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="review">Your Review</Label>
                <Textarea
                  id="review"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="What did you think about this book?"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverUrl">Cover URL</Label>
                <Input
                  id="coverUrl"
                  value={coverUrl}
                  onChange={(e) => setCoverUrl(e.target.value)}
                  placeholder="https://..."
                />
                {coverUrl && (
                  <img
                    src={coverUrl}
                    alt="Cover preview"
                    className="w-24 h-36 object-cover rounded-lg mt-2"
                  />
                )}
              </div>

              <Button type="submit" className="w-full" disabled={saving}>
                {saving ? "Adding..." : "Add to Bookshelf"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
