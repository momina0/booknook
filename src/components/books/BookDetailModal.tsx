import { useEffect, useState } from "react";
import { Book } from "@/types/book";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Star, BookOpen, Calendar, Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface BookDetailModalProps {
  book: Book | null;
  open: boolean;
  onClose: () => void;
}

interface OpenLibraryWork {
  description?: string | { value: string };
  subjects?: string[];
}

export function BookDetailModal({ book, open, onClose }: BookDetailModalProps) {
  const [description, setDescription] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (book && open) {
      fetchBookDescription(book);
    }
  }, [book, open]);

  const fetchBookDescription = async (book: Book) => {
    setLoading(true);
    setError(null);
    setDescription(null);

    try {
      // First, search for the book to get the work key
      const searchQuery = book.isbn 
        ? `isbn:${book.isbn}` 
        : `${book.title} ${book.author}`;
      
      const searchRes = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}&limit=1`
      );
      const searchData = await searchRes.json();

      if (searchData.docs && searchData.docs.length > 0) {
        const workKey = searchData.docs[0].key;
        
        // Fetch the work details to get the description
        const workRes = await fetch(`https://openlibrary.org${workKey}.json`);
        const workData: OpenLibraryWork = await workRes.json();

        if (workData.description) {
          // Description can be a string or an object with a value property
          const desc = typeof workData.description === 'string' 
            ? workData.description 
            : workData.description.value;
          setDescription(desc);
        } else {
          setDescription("No description available for this book.");
        }
      } else {
        setDescription("No description found in OpenLibrary.");
      }
    } catch (err) {
      console.error("Error fetching book description:", err);
      setError("Failed to fetch book description.");
    } finally {
      setLoading(false);
    }
  };

  if (!book) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent 
        className="max-w-2xl max-h-[85vh] overflow-y-auto"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,228,241,0.9) 100%)',
          backdropFilter: 'blur(20px)',
          border: '2px solid rgba(255,182,217,0.5)',
          borderRadius: '1.5rem',
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-display text-pink-600 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-pink-400" />
            Book Details
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col md:flex-row gap-6 mt-4">
          {/* Book Cover */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0"
          >
            <div 
              className="w-40 h-56 rounded-xl overflow-hidden shadow-lg"
              style={{
                boxShadow: '0 8px 32px rgba(255,143,171,0.3)',
              }}
            >
              {book.cover_url ? (
                <img
                  src={book.cover_url}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div 
                  className="w-full h-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #FFB6D9 0%, #D4B4F1 100%)',
                  }}
                >
                  <BookOpen className="w-12 h-12 text-white/80" />
                </div>
              )}
            </div>
          </motion.div>

          {/* Book Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex-1 space-y-4"
          >
            <div>
              <h2 className="text-xl font-display text-gray-800">{book.title}</h2>
              <p className="text-pink-500 font-body">by {book.author}</p>
            </div>

            {/* Rating */}
            {book.rating && (
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= book.rating!
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 text-sm font-body">
                  ({book.rating}/5)
                </span>
              </div>
            )}

            {/* Meta info */}
            <div className="flex flex-wrap gap-3">
              {book.genre && (
                <span 
                  className="px-3 py-1 rounded-full text-sm font-body"
                  style={{
                    background: 'linear-gradient(135deg, #D4B4F1 0%, #C39FE8 100%)',
                    color: 'white',
                  }}
                >
                  {book.genre}
                </span>
              )}
              {book.pages && (
                <span className="flex items-center gap-1 text-sm text-gray-600 font-body">
                  <BookOpen className="w-4 h-4" />
                  {book.pages} pages
                </span>
              )}
              {book.date_read && (
                <span className="flex items-center gap-1 text-sm text-gray-600 font-body">
                  <Calendar className="w-4 h-4" />
                  {new Date(book.date_read).toLocaleDateString()}
                </span>
              )}
            </div>

            {/* Status Badge */}
            <div>
              <span 
                className="px-3 py-1 rounded-full text-sm font-body text-white"
                style={{
                  background: book.status === 'read' 
                    ? 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)'
                    : book.status === 'reading'
                    ? 'linear-gradient(135deg, #FFB6D9 0%, #FF8FAB 100%)'
                    : 'linear-gradient(135deg, #9E9E9E 0%, #757575 100%)',
                }}
              >
                {book.status === 'read' ? '✓ Read' : book.status === 'reading' ? '📖 Reading' : '📚 Want to Read'}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Description Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-6"
        >
          <h3 className="text-lg font-display text-pink-600 mb-3 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Summary
          </h3>
          
          <div 
            className="p-4 rounded-xl"
            style={{
              background: 'rgba(255,255,255,0.6)',
              border: '1px solid rgba(255,182,217,0.3)',
            }}
          >
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 text-pink-400 animate-spin" />
                <span className="ml-3 text-gray-600 font-body">Fetching book summary...</span>
              </div>
            ) : error ? (
              <p className="text-red-500 font-body">{error}</p>
            ) : (
              <p className="text-gray-700 font-body leading-relaxed whitespace-pre-wrap">
                {description}
              </p>
            )}
          </div>
        </motion.div>

        {/* User's Review */}
        {book.review && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-4"
          >
            <h3 className="text-lg font-display text-purple-600 mb-3 flex items-center gap-2">
              <Star className="w-5 h-5" />
              Your Review
            </h3>
            
            <div 
              className="p-4 rounded-xl"
              style={{
                background: 'rgba(212,180,241,0.2)',
                border: '1px solid rgba(212,180,241,0.4)',
              }}
            >
              <p className="text-gray-700 font-body leading-relaxed">
                {book.review}
              </p>
            </div>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
}
