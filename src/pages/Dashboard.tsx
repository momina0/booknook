import { useEffect, useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Star, PenLine, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Book } from "@/types/book";
import { BookCard } from "@/components/books/BookCard";

export default function Dashboard() {
  const { user } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [journalCount, setJournalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    const [booksRes, journalRes] = await Promise.all([
      supabase
        .from("books")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false }),
      supabase
        .from("journal_entries")
        .select("id", { count: "exact" })
        .eq("user_id", user!.id),
    ]);

    if (booksRes.data) setBooks(booksRes.data as Book[]);
    if (journalRes.count !== null) setJournalCount(journalRes.count);
    setLoading(false);
  };

  const totalBooks = books.length;
  const currentlyReading = books.filter((b) => b.status === "reading").length;
  const averageRating =
    books.filter((b) => b.rating).length > 0
      ? (
          books.filter((b) => b.rating).reduce((sum, b) => sum + (b.rating || 0), 0) /
          books.filter((b) => b.rating).length
        ).toFixed(1)
      : "N/A";

  const recentBooks = books.slice(0, 4);

  const stats = [
    {
      title: "Books Read",
      value: totalBooks,
      icon: BookOpen,
      color: "text-primary",
    },
    {
      title: "Currently Reading",
      value: currentlyReading,
      icon: TrendingUp,
      color: "text-accent",
    },
    {
      title: "Average Rating",
      value: averageRating,
      icon: Star,
      color: "text-primary",
    },
    {
      title: "Journal Entries",
      value: journalCount,
      icon: PenLine,
      color: "text-accent",
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Welcome */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back to your reading nook 📚
          </h1>
          <p className="text-muted-foreground">
            Track your reading journey and discover new favorites
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-card-foreground">
                  {loading ? "..." : stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Books */}
        <div>
          <h2 className="text-xl font-serif font-semibold text-foreground mb-4">
            Recently Added
          </h2>
          {loading ? (
            <div className="text-muted-foreground">Loading...</div>
          ) : recentBooks.length === 0 ? (
            <Card className="p-8 text-center bg-card border-border">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Your bookshelf is empty. Add your first book to get started!
              </p>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {recentBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
