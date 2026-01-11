import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { PenLine, Plus, Trash2, Edit, BookOpen } from "lucide-react";
import { Book, JournalEntry } from "@/types/book";
import { format } from "date-fns";

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
  const [selectedBookId, setSelectedBookId] = useState<string>("");
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
    setSelectedBookId("");
    setDialogOpen(true);
  };

  const openEditEntry = (entry: JournalEntry) => {
    setEditingEntry(entry);
    setTitle(entry.title);
    setContent(entry.content);
    setSelectedBookId(entry.book_id || "");
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      toast({
        title: "Missing fields",
        description: "Please enter title and content",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);

    if (editingEntry) {
      // Update
      const { error } = await supabase
        .from("journal_entries")
        .update({
          title,
          content,
          book_id: selectedBookId || null,
        })
        .eq("id", editingEntry.id);

      if (error) {
        toast({ title: "Error", description: "Failed to update entry", variant: "destructive" });
      } else {
        toast({ title: "Entry updated!" });
        fetchData();
        setDialogOpen(false);
      }
    } else {
      // Create
      const { error } = await supabase.from("journal_entries").insert({
        user_id: user!.id,
        title,
        content,
        book_id: selectedBookId || null,
      });

      if (error) {
        toast({ title: "Error", description: "Failed to create entry", variant: "destructive" });
      } else {
        toast({ title: "Entry created!" });
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
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <PenLine className="h-8 w-8 text-primary" />
              Reading Journal
            </h1>
            <p className="text-muted-foreground mt-1">
              Capture your thoughts, quotes, and reflections
            </p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openNewEntry}>
                <Plus className="h-4 w-4 mr-2" />
                New Entry
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="font-serif">
                  {editingEntry ? "Edit Entry" : "New Journal Entry"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="entry-title">Title</Label>
                  <Input
                    id="entry-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Entry title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="entry-book">Related Book (optional)</Label>
                  <Select value={selectedBookId} onValueChange={setSelectedBookId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a book" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">No book</SelectItem>
                      {books.map((book) => (
                        <SelectItem key={book.id} value={book.id}>
                          {book.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="entry-content">Content</Label>
                  <Textarea
                    id="entry-content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your thoughts, favorite quotes, or reflections..."
                    rows={8}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={saving}>
                  {saving ? "Saving..." : editingEntry ? "Update Entry" : "Create Entry"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Entries List */}
        {loading ? (
          <div className="text-muted-foreground">Loading entries...</div>
        ) : entries.length === 0 ? (
          <Card className="p-8 text-center bg-card border-border">
            <PenLine className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No journal entries yet. Start documenting your reading journey!
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => (
              <Card key={entry.id} className="bg-card border-border">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="font-serif text-lg">{entry.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                        <span>{format(new Date(entry.created_at), "MMM d, yyyy")}</span>
                        {getBookTitle(entry.book_id) && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <BookOpen className="h-3 w-3" />
                              {getBookTitle(entry.book_id)}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditEntry(entry)}
                        className="h-8 w-8"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteEntry(entry.id)}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-card-foreground whitespace-pre-wrap">{entry.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
