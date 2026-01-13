import { useEffect, useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { BookCard } from "@/components/books/BookCard";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Book } from "@/types/book";
import { Search, Star, Trash2, Library, BookOpen, BookMarked, Cat, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { WatercolorBlob } from "@/components/decorations/WatercolorBlob";
import { AnimatedFloatingIcon } from "@/components/decorations/AnimatedFloatingIcon";

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
      toast({ title: "Book deleted!", description: "Book removed from your shelf" });
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
      <div className="space-y-6 relative">
        {/* Watercolor blobs */}
        <WatercolorBlob color="#FFB6D9" className="top-0 right-0" size="lg" opacity={0.25} />
        <WatercolorBlob color="#E5D4FF" className="bottom-20 left-0" size="md" opacity={0.2} delay={0.5} />
        
        {/* Floating icons */}
        <AnimatedFloatingIcon icon={Library} className="top-0 right-10" color="#FF8FAB" size={24} />
        <AnimatedFloatingIcon icon={Heart} className="top-20 right-0" color="#D4B4F1" size={18} delay={0.5} />
        
        <motion.div 
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Cat className="h-10 w-10 icon-pink" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-[#FF8FAB] to-[#C39FE8] bg-clip-text text-transparent">
                My Bookshelf
              </h1>
              <p className="text-muted-foreground font-body text-sm flex items-center gap-1">
                {books.length} books in your collection
                <Sparkles className="h-3 w-3 ml-1 icon-purple opacity-60" />
              </p>
            </div>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#FF8FAB]/60" />
            <Input
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-[#FFB6D9]/50 focus:border-[#FF8FAB] focus:ring-[#FFB6D9]/30 bg-white/70 text-sm font-body rounded-full"
            />
          </div>
        </motion.div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-gradient-to-r from-[#FFB6D9]/20 to-[#D4B4F1]/20 border border-[#FFB6D9]/30 rounded-full p-1">
            <TabsTrigger 
              value="all" 
              className="font-cute text-sm rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF8FAB] data-[state=active]:to-[#FFB6D9] data-[state=active]:text-white transition-all"
            >
              All ({filteredBooks.length})
            </TabsTrigger>
            <TabsTrigger 
              value="read" 
              className="font-cute text-sm rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF8FAB] data-[state=active]:to-[#FFB6D9] data-[state=active]:text-white transition-all"
            >
              Read ({getBooksByStatus("read").length})
            </TabsTrigger>
            <TabsTrigger 
              value="reading" 
              className="font-cute text-sm rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#C39FE8] data-[state=active]:to-[#D4B4F1] data-[state=active]:text-white transition-all"
            >
              Reading ({getBooksByStatus("reading").length})
            </TabsTrigger>
            <TabsTrigger 
              value="want-to-read" 
              className="font-cute text-sm rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#D4B4F1] data-[state=active]:to-[#E5D4FF] data-[state=active]:text-white transition-all"
            >
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
        <DialogContent className="max-w-lg glass-card-pink border-0 pink-shadow">
          {selectedBook && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-xl bg-gradient-to-r from-[#FF8FAB] to-[#C39FE8] bg-clip-text text-transparent">
                  {selectedBook.title}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex gap-4">
                  {selectedBook.cover_url && (
                    <img
                      src={selectedBook.cover_url}
                      alt={selectedBook.title}
                      className="w-24 h-36 object-cover rounded-xl border-2 border-[#FFB6D9]/50 pink-shadow"
                    />
                  )}
                  <div className="flex-1 space-y-2">
                    <p className="text-muted-foreground font-body text-sm">{selectedBook.author}</p>
                    {selectedBook.genre && (
                      <span className="inline-block text-xs bg-gradient-to-r from-[#FFB6D9]/30 to-[#D4B4F1]/30 text-[#FF8FAB] px-3 py-1 rounded-full font-cute">
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
                                ? "fill-[#FFB6D9] text-[#FF8FAB]"
                                : "text-[#FFB6D9]/30"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                    {selectedBook.date_read && (
                      <p className="text-xs text-muted-foreground font-body">
                        Read on {format(new Date(selectedBook.date_read), "MMM d, yyyy")}
                      </p>
                    )}
                  </div>
                </div>
                {selectedBook.review && (
                  <div className="bg-gradient-to-r from-[#FFB6D9]/20 to-[#D4B4F1]/20 rounded-xl p-4 border border-[#FFB6D9]/30">
                    <h4 className="font-cute font-semibold mb-1 text-[#FF8FAB] text-sm">Your Review</h4>
                    <p className="text-muted-foreground font-body text-sm">{selectedBook.review}</p>
                  </div>
                )}
                <Button
                  variant="destructive"
                  onClick={() => deleteBook(selectedBook.id)}
                  className="w-full bg-gradient-to-r from-[#FF8FAB] to-[#FF6B8A] hover:from-[#FF6B8A] hover:to-[#FF5073] text-white text-sm rounded-full"
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
    return (
      <motion.div 
        className="text-muted-foreground font-body text-sm text-center py-6 flex items-center justify-center gap-2"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <Cat className="h-8 w-8 icon-pink" />
        Loading your books...
      </motion.div>
    );
  }

  if (books.length === 0) {
    return (
      <motion.div 
        className="text-center py-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <BookOpen className="h-16 w-16 icon-pink mx-auto mb-3" />
        </motion.div>
        <p className="text-muted-foreground font-body text-sm">No books found. Start adding some!</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence>
        {books.map((book, index) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: index * 0.05 }}
          >
            <BookCard book={book} onClick={() => onSelect(book)} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
