import { Book } from "@/types/book";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookCardProps {
  book: Book;
  onClick?: () => void;
}

export function BookCard({ book, onClick }: BookCardProps) {
  return (
    <Card
      className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-card border-border"
      onClick={onClick}
    >
      <div className="aspect-[2/3] relative overflow-hidden bg-muted">
        {book.cover_url ? (
          <img
            src={book.cover_url}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-secondary">
            <span className="text-4xl font-serif text-muted-foreground">
              {book.title.charAt(0)}
            </span>
          </div>
        )}
        {book.status === "reading" && (
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
            Reading
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-serif font-semibold text-card-foreground line-clamp-2 mb-1">
          {book.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
        {book.rating && (
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={cn(
                  "h-4 w-4",
                  star <= book.rating!
                    ? "fill-primary text-primary"
                    : "text-muted-foreground"
                )}
              />
            ))}
          </div>
        )}
        {book.genre && (
          <span className="inline-block mt-2 text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
            {book.genre}
          </span>
        )}
      </CardContent>
    </Card>
  );
}
