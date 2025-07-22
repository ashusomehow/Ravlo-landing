import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

interface Draft {
  id: string;
  title: string;
  content: string;
  timestamp: number;
}

function getDrafts(): Draft[] {
  try {
    return JSON.parse(localStorage.getItem("ravlo-drafts") || "[]");
  } catch {
    return [];
  }
}

function saveDrafts(drafts: Draft[]) {
  localStorage.setItem("ravlo-drafts", JSON.stringify(drafts));
}

const PostFormatter: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const editorRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [boldActive, setBoldActive] = useState(false);
  const [italicActive, setItalicActive] = useState(false);
  const [underlineActive, setUnderlineActive] = useState(false);

  // Update formatting button states
  const updateFormatStates = () => {
    setBoldActive(document.queryCommandState('bold'));
    setItalicActive(document.queryCommandState('italic'));
    setUnderlineActive(document.queryCommandState('underline'));
  };

  // Load content from navigation state (for integration)
  useEffect(() => {
    if (location.state && location.state.content) {
      setContent(location.state.content);
      setTitle(location.state.title || "");
      setEditingId(location.state.id || null);
      setInitialized(false);
    } else {
      // Check for preloaded content from post generator
      const preload = localStorage.getItem('ravlo-formatter-preload');
      if (preload) {
        setContent(preload);
        setInitialized(false);
        if (editorRef.current) editorRef.current.innerHTML = preload;
        localStorage.removeItem('ravlo-formatter-preload');
      }
    }
  }, [location.state]);

  useEffect(() => {
    document.addEventListener('selectionchange', updateFormatStates);
    return () => document.removeEventListener('selectionchange', updateFormatStates);
  }, []);

  useEffect(() => {
    if (!initialized && editorRef.current && content) {
      editorRef.current.innerHTML = content;
      setInitialized(true);
    }
  }, [content, initialized]);

  // Formatting handlers
  const format = (command: string) => {
    document.execCommand(command, false);
    setContent(editorRef.current?.innerHTML || "");
    updateFormatStates();
  };

  // Save or update draft
  const handleSave = () => {
    const htmlContent = editorRef.current?.innerHTML || "";
    if (!htmlContent.trim()) {
      toast.error("Cannot save an empty draft.");
      return;
    }
    let drafts = getDrafts();
    if (editingId) {
      drafts = drafts.map(d => d.id === editingId ? { ...d, title: title || `Draft #${d.id.slice(-4)}`, content: htmlContent, timestamp: Date.now() } : d);
      toast.success("Draft updated!");
    } else {
      const id = Date.now().toString();
      drafts.unshift({ id, title: title || `Draft #${drafts.length + 1}`, content: htmlContent, timestamp: Date.now() });
      toast.success("Draft saved!");
    }
    saveDrafts(drafts);
    setEditingId(null);
    setTitle("");
    setContent("");
    setInitialized(false);
    if (editorRef.current) editorRef.current.innerHTML = "";
    setTimeout(() => navigate('/saved-drafts'), 800);
  };

  return (
    <>
      <Navigation />
      <div className="max-w-3xl mx-auto py-12 px-4 animate-fade-in">
        <Card className="bg-gradient-to-br from-blue-50/60 via-white/80 to-blue-100/60 dark:from-slate-900/60 dark:via-slate-800/80 dark:to-blue-900/60 shadow-2xl border-2 border-primary/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <span role="img" aria-label="edit">📝</span> Post Formatter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-col md:flex-row md:items-center gap-2">
              <Input
                placeholder="Draft Title (optional)"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="md:w-1/2"
              />
              <div className="flex gap-2 mt-2 md:mt-0">
                <Button type="button" variant={boldActive ? "secondary" : "outline"} size="sm" onClick={() => format('bold')} title="Bold" className={boldActive ? "ring-2 ring-primary" : ""}><b>B</b></Button>
                <Button type="button" variant={italicActive ? "secondary" : "outline"} size="sm" onClick={() => format('italic')} title="Italic" className={italicActive ? "ring-2 ring-primary" : ""}><i>I</i></Button>
                <Button type="button" variant={underlineActive ? "secondary" : "outline"} size="sm" onClick={() => format('underline')} title="Underline" className={underlineActive ? "ring-2 ring-primary" : ""}><u>U</u></Button>
              </div>
            </div>
            <div
              ref={editorRef}
              contentEditable
              className="min-h-[200px] max-h-[400px] w-full rounded-lg border border-border bg-background/70 p-4 mb-4 focus:outline-primary text-base transition-all shadow-inner overflow-auto"
              placeholder="Write or paste your LinkedIn post here..."
              onInput={e => { setContent((e.target as HTMLDivElement).innerHTML); updateFormatStates(); }}
              aria-label="Post Editor"
            />
            <Button onClick={handleSave} className="w-full mt-2" variant="hero">
              {editingId ? "Update Draft" : "Save Draft"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default PostFormatter; 