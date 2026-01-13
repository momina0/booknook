import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit, BookOpen, NotebookPen, Cat, Heart, Sparkles, PenLine } from "lucide-react";
import { Book, JournalEntry } from "@/types/book";
import { format } from "date-fns";
import { StickerPicker, StickerDisplay } from "@/components/decorations/Stickers";
import { motion, AnimatePresence } from "framer-motion";
import { WatercolorBlob } from "@/components/decorations/WatercolorBlob";
import { AnimatedFloatingIcon } from "@/components/decorations/AnimatedFloatingIcon";

export default function Journal() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedBookId, setSelectedBookId] = useState<string>("none");
  const [selectedStickers, setSelectedStickers] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  const fetchData = async () => {
    const [entriesRes, booksRes] = await Promise.all([
      supabase
        .from("journal_entries")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false }),
      supabase.from("books").select("*").eq("user_id", user!.id),
    ]);

    if (entriesRes.data) setEntries(entriesRes.data as JournalEntry[]);
    if (booksRes.data) setBooks(booksRes.data as Book[]);
    setLoading(false);
  };

  const openNewEntry = () => {
    setEditingEntry(null);
    setTitle("");
    setContent("");
    setSelectedBookId("none");
    setSelectedStickers([]);
    setDialogOpen(true);
  };

  const openEditEntry = (entry: JournalEntry) => {
    setEditingEntry(entry);
    setTitle(entry.title);
    const { stickers, cleanContent } = parseContent(entry.content);
    setContent(cleanContent);
    setSelectedBookId(entry.book_id || "none");
    setSelectedStickers(stickers);
    setDialogOpen(true);
  };

  const handleStickerToggle = (stickerId: string) => {
    setSelectedStickers(prev => 
      prev.includes(stickerId)
        ? prev.filter(id => id !== stickerId)
        : [...prev, stickerId]
    );
  };

  // Parse content to extract stickers and clean content
  const parseContent = (rawContent: string) => {
    const stickerMatch = rawContent.match(/<!--stickers:(\[.*?\])-->/);
    let stickers: string[] = [];
    let cleanContent = rawContent;

    if (stickerMatch) {
      try {
        stickers = JSON.parse(stickerMatch[1]);
        cleanContent = rawContent.replace(/\n\n<!--stickers:\[.*?\]-->/, '');
      } catch (e) {
        // Invalid JSON, ignore
      }
    }

    return { stickers, cleanContent };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      toast({
        title: "Oops!",
        description: "Please fill in the title and your thoughts!",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);

    const bookId = selectedBookId === "none" ? null : selectedBookId || null;
    
    // Store stickers in the content as a JSON suffix
    const contentWithStickers = selectedStickers.length > 0 
      ? `${content}\n\n<!--stickers:${JSON.stringify(selectedStickers)}-->`
      : content;

    if (editingEntry) {
      const { error } = await supabase
        .from("journal_entries")
        .update({
          title,
          content: contentWithStickers,
          book_id: bookId,
        })
        .eq("id", editingEntry.id);

      if (error) {
        toast({ title: "Error", description: "Failed to update entry", variant: "destructive" });
      } else {
        toast({ title: "Entry updated!", description: "Your journal entry has been saved!" });
        fetchData();
        setDialogOpen(false);
      }
    } else {
      const { error } = await supabase.from("journal_entries").insert({
        user_id: user!.id,
        title,
        content: contentWithStickers,
        book_id: bookId,
      });

      if (error) {
        toast({ title: "Error", description: "Failed to create entry", variant: "destructive" });
      } else {
        toast({ title: "Entry created!", description: "Your thoughts have been saved!" });
        fetchData();
        setDialogOpen(false);
      }
    }
    setSaving(false);
  };

  const deleteEntry = async (id: string) => {
    const { error } = await supabase.from("journal_entries").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: "Failed to delete entry", variant: "destructive" });
    } else {
      toast({ title: "Entry deleted" });
      setEntries(entries.filter((e) => e.id !== id));
    }
  };

  const getBookTitle = (bookId: string | null | undefined) => {
    if (!bookId) return null;
    return books.find((b) => b.id === bookId)?.title;
  };

  return (
    <MainLayout>
      <div className="space-y-4 max-w-5xl mx-auto relative">
        {/* Watercolor blobs */}
        <WatercolorBlob color="#FFB6D9" className="top-0 right-0" size="lg" opacity={0.25} />
        <WatercolorBlob color="#E5D4FF" className="bottom-20 left-0" size="md" opacity={0.2} delay={0.5} />
        
        {/* Floating icons */}
        <AnimatedFloatingIcon icon={PenLine} className="top-0 right-5" color="#FF8FAB" size={24} />
        <AnimatedFloatingIcon icon={Heart} className="top-16 right-0" color="#D4B4F1" size={18} delay={0.5} />
        
        {/* Compact Header */}
        <motion.div 
          className="flex items-center justify-between"
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
                My Reading Journal
              </h1>
              <p className="text-sm text-muted-foreground font-body">
                Capture your thoughts and reflections
              </p>
            </div>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={openNewEntry}
                size="sm"
                className="pink-btn pink-shadow"
              >
                <Plus className="h-4 w-4 mr-1" />
                Write New Entry
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto glass-card-pink border-0 pink-shadow">
              <DialogHeader>
                <DialogTitle className="font-display text-xl flex items-center gap-2 bg-gradient-to-r from-[#FF8FAB] to-[#C39FE8] bg-clip-text text-transparent">
                  <Cat className="h-6 w-6 icon-pink" />
                  {editingEntry ? "Edit Entry" : "Dear Diary..."}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Compact Form */}
                <div className="space-y-1">
                  <Label htmlFor="entry-title" className="text-sm font-cute flex items-center gap-1">
                    <NotebookPen className="h-4 w-4 icon-pink" /> Title
                  </Label>
                  <Input
                    id="entry-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Give your entry a title..."
                    className="border-[#FFB6D9]/50 focus:border-[#FF8FAB] focus:ring-[#FFB6D9]/30 font-body text-sm h-10 rounded-full bg-white/50"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="entry-book" className="text-sm font-cute flex items-center gap-1">
                    <BookOpen className="h-4 w-4 icon-purple" /> Related Book
                  </Label>
                  <Select value={selectedBookId} onValueChange={setSelectedBookId}>
                    <SelectTrigger className="border-[#D4B4F1]/50 focus:border-[#C39FE8] h-10 text-sm rounded-full bg-white/50">
                      <SelectValue placeholder="Select a book (optional)" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl bg-white border-[#D4B4F1]/50">
                      <SelectItem value="none" className="text-sm">Just my thoughts...</SelectItem>
                      {books.map((book) => (
                        <SelectItem key={book.id} value={book.id} className="text-sm">
                          {book.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="entry-content" className="text-sm font-cute flex items-center gap-1">
                    <Sparkles className="h-4 w-4 icon-purple" /> Your Thoughts
                  </Label>
                  <Textarea
                    id="entry-content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Dear diary, today I read something amazing..."
                    rows={4}
                    className="border-[#FFB6D9]/50 focus:border-[#FF8FAB] focus:ring-[#FFB6D9]/30 font-handwriting text-sm resize-none rounded-xl bg-white/50"
                    required
                  />
                </div>

                {/* Compact Sticker Picker */}
                <div className="bg-gradient-to-r from-[#FFB6D9]/20 to-[#D4B4F1]/20 rounded-xl p-3 border border-[#FFB6D9]/30">
                  <StickerPicker
                    selectedStickers={selectedStickers}
                    onStickerToggle={handleStickerToggle}
                    maxStickers={5}
                  />
                </div>

                {selectedStickers.length > 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground font-cute">Your stickers:</span>
                    <StickerDisplay stickerIds={selectedStickers} size="sm" />
                  </div>
                )}

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
                      Saving...
                    </motion.span>
                  ) : editingEntry ? (
                    "Update Entry"
                  ) : (
                    <>
                      <Heart className="h-4 w-4 mr-2" />
                      Save to Diary
                    </>
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Entries List - More Compact */}
        {loading ? (
          <motion.div 
            className="text-muted-foreground flex items-center gap-2 font-body"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Cat className="h-8 w-8 icon-pink" />
            Loading your entries...
          </motion.div>
        ) : entries.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="glass-card-pink border-0 text-center p-8">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Cat className="h-16 w-16 icon-pink mx-auto mb-3" />
              </motion.div>
              <p className="text-muted-foreground font-body">
                Your journal is waiting for your first entry!
              </p>
              <p className="text-sm text-muted-foreground mt-1 font-cute">
                Click "Write New Entry" to start documenting your reading journey
              </p>
            </Card>
          </motion.div>
        ) : (
          <motion.div 
            className="grid gap-4 md:grid-cols-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <AnimatePresence>
              {entries.map((entry, index) => {
                const { stickers, cleanContent } = parseContent(entry.content);
                
                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="group glass-card-pink border-0 pink-shadow overflow-hidden">
                      <motion.div whileHover={{ scale: 1.01 }}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h3 className="font-display text-base text-foreground truncate">
                                  {entry.title}
                                </h3>
                                {stickers.length > 0 && <StickerDisplay stickerIds={stickers.slice(0, 2)} size="md" />}
                              </div>
                              <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground font-body">
                                <span>{format(new Date(entry.created_at), "MMM d, yyyy")}</span>
                                {getBookTitle(entry.book_id) && (
                                  <>
                                    <span className="text-[#FF8FAB]">•</span>
                                    <span className="truncate max-w-[150px]">{getBookTitle(entry.book_id)}</span>
                                  </>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openEditEntry(entry)}
                                className="h-7 w-7 hover:bg-[#D4B4F1]/30 hover:text-[#C39FE8] rounded-full"
                              >
                                <Edit className="h-3.5 w-3.5" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteEntry(entry.id)}
                                className="h-7 w-7 text-[#FF8FAB] hover:bg-[#FFB6D9]/30 hover:text-[#FF6B8A] rounded-full"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>
                          
                          <p className="mt-2 font-handwriting text-sm text-muted-foreground line-clamp-2">
                            {cleanContent}
                          </p>
                          
                          {stickers.length > 2 && (
                            <div className="mt-2 flex justify-end">
                              <StickerDisplay stickerIds={stickers} size="md" />
                            </div>
                          )}
                        </CardContent>
                      </motion.div>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
}
