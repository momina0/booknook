import { Book } from "@/types/book";
import { Star, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BookCardProps {
  book: Book;
  onClick?: () => void;
}

export function BookCard({ book, onClick }: BookCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.05, rotate: 2 }}
      className="group cursor-pointer relative overflow-hidden"
      onClick={onClick}
      style={{
        borderRadius: '1.2rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
      }}
    >
      <div className="aspect-[2/3] relative overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100">
        {book.cover_url ? (
          <img
            src={book.cover_url}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
            <BookOpen className="h-12 w-12 text-pink-300 mb-2" />
            <p className="text-sm font-cute font-semibold text-gray-600 line-clamp-3">{book.title}</p>
          </div>
        )}
        
        {/* Status Badge */}
        {book.status === "reading" && (
          <div 
            className="absolute top-2 right-2 text-white text-xs px-3 py-1 rounded-full font-cute shadow-sm"
            style={{ background: 'linear-gradient(135deg, #FFB6D9 0%, #FF8FAB 100%)' }}
          >
            Reading
          </div>
        )}
        {book.status === "want-to-read" && (
          <div 
            className="absolute top-2 right-2 text-white text-xs px-3 py-1 rounded-full font-cute shadow-sm"
            style={{ background: 'linear-gradient(135deg, #D4B4F1 0%, #C39FE8 100%)' }}
          >
            Want to Read
          </div>
        )}
        
        {/* Hover overlay */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(255,182,217,0.9) 0%, rgba(212,180,241,0.9) 100%)',
            backdropFilter: 'blur(4px)',
          }}
        >
          <span 
            className="text-white text-sm px-4 py-2 rounded-full font-semibold font-cute"
            style={{ background: 'rgba(255,255,255,0.3)' }}
          >
            View Details
          </span>
        </div>

        {/* Decorative sparkle */}
        <div className="absolute top-2 right-2 text-2xl opacity-0 group-hover:opacity-100 transition-opacity">
          ✨
        </div>
      </div>
      
      {/* Card Footer */}
      <div 
        className="p-3"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,240,255,0.9) 100%)',
        }}
      >
        <h3 className="font-cute font-semibold text-gray-800 line-clamp-1 mb-0.5 text-sm">
          {book.title}
        </h3>
        <p className="text-xs text-gray-500 mb-1.5 font-body">{book.author}</p>
        {book.rating && (
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={cn(
                  "h-3 w-3",
                  star <= book.rating!
                    ? "fill-pink-400 text-pink-400"
                    : "text-gray-300"
                )}
              />
            ))}
          </div>
        )}
        {book.genre && (
          <span 
            className="inline-block mt-2 text-xs text-pink-600 px-3 py-1 rounded-full font-cute"
            style={{ background: 'rgba(255,182,217,0.3)' }}
          >
            {book.genre}
          </span>
        )}
      </div>
    </motion.div>
  );
}
