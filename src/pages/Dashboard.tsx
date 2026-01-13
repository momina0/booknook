import { useEffect, useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { BookOpen, Star, PenLine, BookMarked, Plus, Sparkles, Cat, Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Book } from "@/types/book";
import { BookCard } from "@/components/books/BookCard";
import { BookDetailModal } from "@/components/books/BookDetailModal";
import { WatercolorBlob } from "@/components/decorations/WatercolorBlob";
import { AnimatedFloatingIcon } from "@/components/decorations/AnimatedFloatingIcon";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [journalCount, setJournalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

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

  const recentBooks = books.slice(0, 5);

  const stats = [
    {
      title: "Books Read",
      value: totalBooks,
      icon: BookOpen,
      gradient: "linear-gradient(135deg, #FFB6D9 0%, #FF8FAB 100%)",
      iconBg: "bg-pink-400",
    },
    {
      title: "Currently Reading",
      value: currentlyReading,
      icon: BookMarked,
      gradient: "linear-gradient(135deg, #D4B4F1 0%, #C39FE8 100%)",
      iconBg: "bg-purple-400",
    },
    {
      title: "Average Rating",
      value: averageRating,
      icon: Star,
      gradient: "linear-gradient(135deg, #FFD4E5 0%, #FFC1DC 100%)",
      iconBg: "bg-pink-300",
    },
    {
      title: "Journal Entries",
      value: journalCount,
      icon: PenLine,
      gradient: "linear-gradient(135deg, #E5D4FF 0%, #D4B4FF 100%)",
      iconBg: "bg-purple-300",
    },
  ];

  return (
    <MainLayout>
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <WatercolorBlob color="#FFB6D9" className="top-[8%] left-[15%]" size="xl" opacity={0.15} delay={0} />
        <WatercolorBlob color="#E5D4FF" className="top-[25%] right-[10%]" size="lg" opacity={0.12} delay={1} />
        <WatercolorBlob color="#FFD4E5" className="bottom-[15%] left-[20%]" size="xl" opacity={0.13} delay={2} />
        <WatercolorBlob color="#D4B4F1" className="top-[50%] right-[25%]" size="lg" opacity={0.12} delay={1.5} />
        
        <AnimatedFloatingIcon icon={Cat} className="top-[12%] right-[8%]" size={40} color="#FF8FAB" delay={0} duration={5} />
        <AnimatedFloatingIcon icon={Heart} className="top-[35%] left-[5%]" size={32} color="#FFB6D9" delay={1} duration={6} />
        <AnimatedFloatingIcon icon={BookOpen} className="bottom-[25%] left-[8%]" size={36} color="#C39FE8" delay={2} duration={5.5} />
        <AnimatedFloatingIcon icon={Sparkles} className="top-[60%] right-[12%]" size={28} color="#FF8FAB" delay={0.5} duration={4.5} />
      </div>

      <div className="relative z-10 space-y-8 max-w-6xl mx-auto">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-6"
        >
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <BookOpen className="w-16 h-16 text-pink-400" strokeWidth={1.5} />
          </motion.div>
          <div>
            <h1 
              className="text-4xl font-display mb-2"
              style={{ color: '#C2185B' }}
            >
              Welcome back to your reading nook
            </h1>
            <p className="text-lg text-gray-600 font-body">
              Track your reading journey and discover new favorites ✨
            </p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
                borderRadius: '1.5rem',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255,255,255,0.6)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              }}
            >
              {/* Watercolor wash effect */}
              <div 
                className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-15"
                style={{ background: stat.gradient, filter: 'blur(25px)' }}
              />
              
              <div className="relative p-6">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.iconBg}`}
                >
                  <stat.icon className="w-5 h-5 text-white" strokeWidth={2.5} />
                </motion.div>
                
                <p className="text-gray-500 text-xs font-semibold font-body mb-1">
                  {stat.title}
                </p>
                <p className="text-4xl font-display text-gray-800">
                  {loading ? "..." : stat.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recently Added Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #FFB6D9 0%, #FF8FAB 100%)' }}
              >
                <BookOpen className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <h2 className="text-3xl font-cute font-bold text-gray-800">
                Recently Added
              </h2>
            </div>
            
            <Link to="/add-book">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full flex items-center justify-center shadow-md"
                style={{ background: 'linear-gradient(135deg, #FFB6D9 0%, #FF8FAB 100%)' }}
              >
                <Plus className="w-5 h-5 text-white" strokeWidth={2.5} />
              </motion.button>
            </Link>
          </div>

          {loading ? (
            <div className="text-gray-500 font-body flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-pink-400" />
              </motion.div>
              Loading your books...
            </div>
          ) : recentBooks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,240,255,0.85) 100%)',
                borderRadius: '2rem',
                border: '2px solid rgba(255,182,217,0.4)',
              }}
            >
              <Cat className="w-16 h-16 text-pink-300 mx-auto mb-4" strokeWidth={1.5} />
              <p className="text-gray-600 font-body">
                Your bookshelf is empty. Add your first book to get started! 📚
              </p>
              <Link to="/add-book">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 px-6 py-3 rounded-full text-white font-semibold font-cute shadow-md"
                  style={{ background: 'linear-gradient(135deg, #FFB6D9 0%, #FF8FAB 100%)' }}
                >
                  Add Your First Book
                </motion.button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {recentBooks.map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <BookCard 
                    book={book} 
                    onClick={() => {
                      setSelectedBook(book);
                      setModalOpen(true);
                    }}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Bottom Section - Reading Goals & Journal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Reading Goals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,240,255,0.85) 100%)',
              borderRadius: '2rem',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255,182,217,0.4)',
              boxShadow: '0 8px 32px rgba(255,182,217,0.2)',
            }}
          >
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #D4B4F1 0%, #C39FE8 100%)' }}
                >
                  <Star className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-cute font-bold text-gray-800">
                  Reading Goals
                </h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-body font-semibold text-gray-600">
                      2026 Goal: 24 books
                    </span>
                    <span className="font-body font-bold text-gray-700">
                      {totalBooks}/24
                    </span>
                  </div>
                  <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((totalBooks / 24) * 100, 100)}%` }}
                      transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(90deg, #FFB6D9 0%, #FF8FAB 100%)' }}
                    />
                  </div>
                </div>
                <div className="pt-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-pink-400" />
                  <p className="text-sm text-gray-600 font-body">
                    {totalBooks > 0 ? "You're off to a great start! Keep reading! 📚" : "Start your reading journey today! 🌟"}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-3 -right-3 opacity-10">
              <Cat className="w-24 h-24 text-pink-400" strokeWidth={1} />
            </div>
          </motion.div>

          {/* Journal Snapshot */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255,182,217,0.3) 0%, rgba(220,180,240,0.3) 100%)',
              borderRadius: '2rem',
              border: '2px solid rgba(255,182,217,0.5)',
              boxShadow: '0 8px 32px rgba(255,182,217,0.15)',
            }}
          >
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #FFB6D9 0%, #FF8FAB 100%)' }}
                >
                  <PenLine className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-cute font-bold text-gray-800">
                  Journal Entries
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-pink-400" />
                  <p className="font-body text-gray-700">
                    You've written <span className="font-bold">{journalCount} entries</span> so far
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-400" />
                  <p className="font-body text-gray-700">
                    Document your reading adventures! 🌸
                  </p>
                </div>
              </div>

              <Link to="/journal">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 w-full py-3 text-white flex items-center justify-center gap-2 shadow-md font-bold font-body"
                  style={{
                    background: 'linear-gradient(135deg, #FFB6D9 0%, #FF8FAB 100%)',
                    borderRadius: '1.5rem',
                  }}
                >
                  <PenLine className="w-4 h-4" />
                  Write New Entry
                </motion.button>
              </Link>
            </div>

            <div className="absolute -top-3 -right-3 opacity-15">
              <Heart className="w-20 h-20 text-pink-400 fill-pink-300" strokeWidth={1} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Book Detail Modal */}
      <BookDetailModal
        book={selectedBook}
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedBook(null);
        }}
      />
    </MainLayout>
  );
}
