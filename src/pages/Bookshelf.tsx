import { useEffect, useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { BookCard } from "@/components/books/BookCard";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Book } from "@/types/book";
import { Search, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

export default function Bookshelf() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  useEffect(() => {
    if (user) fetchBooks();
  }, [user]);

  const fetchBooks = async () => {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .eq("user_id", user!.id)
      .order("created_at", { ascending: false });

    if (data) setBooks(data as Book[]);
    if (error) console.error("Error fetching books:", error);
    setLoading(false);
  };

  const deleteBook = async (id: string) => {
    const { error } = await supabase.from("books").delete().eq("id", id);
    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete book",
        variant: "destructive",
      });
    } else {
      toast({ title: "Book deleted" });
      setBooks(books.filter((b) => b.id !== id));
      setSelectedBook(null);
    }
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getBooksByStatus = (status: string) =>
    filteredBooks.filter((b) => b.status === status);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Bookshelf</h1>
            <p className="text-muted-foreground">
              {books.length} books in your collection
            </p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-muted">
            <TabsTrigger value="all">All ({filteredBooks.length})</TabsTrigger>
            <TabsTrigger value="read">
              Read ({getBooksByStatus("read").length})
            </TabsTrigger>
            <TabsTrigger value="reading">
              Reading ({getBooksByStatus("reading").length})
            </TabsTrigger>
            <TabsTrigger value="want-to-read">
              Want to Read ({getBooksByStatus("want-to-read").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <BookGrid books={filteredBooks} loading={loading} onSelect={setSelectedBook} />
          </TabsContent>
          <TabsContent value="read" className="mt-6">
            <BookGrid books={getBooksByStatus("read")} loading={loading} onSelect={setSelectedBook} />
          </TabsContent>
          <TabsContent value="reading" className="mt-6">
            <BookGrid books={getBooksByStatus("reading")} loading={loading} onSelect={setSelectedBook} />
          </TabsContent>
          <TabsContent value="want-to-read" className="mt-6">
            <BookGrid books={getBooksByStatus("want-to-read")} loading={loading} onSelect={setSelectedBook} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Book Detail Dialog */}
      <Dialog open={!!selectedBook} onOpenChange={() => setSelectedBook(null)}>
        <DialogContent className="max-w-lg">
          {selectedBook && (
            <>
              <DialogHeader>
                <DialogTitle className="font-serif text-xl">
                  {selectedBook.title}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex gap-4">
                  {selectedBook.cover_url && (
                    <img
                      src={selectedBook.cover_url}
                      alt={selectedBook.title}
                      className="w-24 h-36 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-1 space-y-2">
                    <p className="text-muted-foreground">{selectedBook.author}</p>
                    {selectedBook.genre && (
                      <span className="inline-block text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                        {selectedBook.genre}
                      </span>
                    )}
                    {selectedBook.rating && (
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= selectedBook.rating!
                                ? "fill-primary text-primary"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                    {selectedBook.date_read && (
                      <p className="text-sm text-muted-foreground">
                        Read on {format(new Date(selectedBook.date_read), "MMM d, yyyy")}
                      </p>
                    )}
                  </div>
                </div>
                {selectedBook.review && (
                  <div>
                    <h4 className="font-semibold mb-1">Your Review</h4>
                    <p className="text-muted-foreground">{selectedBook.review}</p>
                  </div>
                )}
                <Button
                  variant="destructive"
                  onClick={() => deleteBook(selectedBook.id)}
                  className="w-full"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Book
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}

function BookGrid({
  books,
  loading,
  onSelect,
}: {
  books: Book[];
  loading: boolean;
  onSelect: (book: Book) => void;
}) {
  if (loading) {
    return <div className="text-muted-foreground">Loading your books...</div>;
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No books found. Start adding some!
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onClick={() => onSelect(book)} />
      ))}
    </div>
  );
}
