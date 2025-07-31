import React, { useRef, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import { toast } from "sonner";
import { Copy, RotateCcw } from "lucide-react";

// Unicode mapping helpers
const boldSerifMap = {
  A: "𝐀", B: "𝐁", C: "𝐂", D: "𝐃", E: "𝐄", F: "𝐅", G: "𝐆", H: "𝐇", I: "𝐈", J: "𝐉", K: "𝐊", L: "𝐋", M: "𝐌", N: "𝐍", O: "𝐎", P: "𝐏", Q: "𝐐", R: "𝐑", S: "𝐒", T: "𝐓", U: "𝐔", V: "𝐕", W: "𝐖", X: "𝐗", Y: "𝐘", Z: "𝐙",
  a: "𝐚", b: "𝐛", c: "𝐜", d: "𝐝", e: "𝐞", f: "𝐟", g: "𝐠", h: "𝐡", i: "𝐢", j: "𝐣", k: "𝐤", l: "𝐥", m: "𝐦", n: "𝐧", o: "𝐨", p: "𝐩", q: "𝐪", r: "𝐫", s: "𝐬", t: "𝐭", u: "𝐮", v: "𝐯", w: "𝐰", x: "𝐱", y: "𝐲", z: "𝐳"
};

const monoMap = {
  A: "𝙰", B: "𝙱", C: "𝙲", D: "𝙳", E: "𝙴", F: "𝙵", G: "𝙶", H: "𝙷", I: "𝙸", J: "𝙹", K: "𝙺", L: "𝙻", M: "𝙼", N: "𝙽", O: "𝙾", P: "𝙿", Q: "𝚀", R: "𝚁", S: "𝚂", T: "𝚃", U: "𝚄", V: "𝚅", W: "𝚆", X: "𝚇", Y: "𝚈", Z: "𝚉",
  a: "𝚊", b: "𝚋", c: "𝚌", d: "𝚍", e: "𝚎", f: "𝚏", g: "𝚐", h: "𝚑", i: "𝚒", j: "𝚓", k: "𝚔", l: "𝚕", m: "𝚖", n: "𝚗", o: "𝚘", p: "𝚙", q: "𝚚", r: "𝚛", s: "𝚜", t: "𝚝", u: "𝚞", v: "𝚟", w: "𝚠", x: "𝚡", y: "𝚢", z: "𝚣"
};

const italicMap = {
  A: "𝘈", B: "𝘉", C: "𝘊", D: "𝘋", E: "𝘌", F: "𝘍", G: "𝘎", H: "𝘏", I: "𝘐", J: "𝘑", K: "𝘒", L: "𝘓", M: "𝘔", N: "𝘕", O: "𝘖", P: "𝘗", Q: "𝘘", R: "𝘙", S: "𝘚", T: "𝘛", U: "𝘜", V: "𝘝", W: "𝘞", X: "𝘟", Y: "𝘠", Z: "𝘡",
  a: "𝘢", b: "𝘣", c: "𝘤", d: "𝘥", e: "𝘦", f: "𝘧", g: "𝘨", h: "𝘩", i: "𝘪", j: "𝘫", k: "𝘬", l: "𝘭", m: "𝘮", n: "𝘯", o: "𝘰", p: "𝘱", q: "𝘲", r: "𝘳", s: "𝘴", t: "𝘵", u: "𝘶", v: "𝘷", w: "𝘸", x: "𝘹", y: "𝘺", z: "𝘻"
};

// Helper functions
function underline(text: string) {
  return text.split('').map(c => c + '\u0332').join('');
}

function applyFont(text: string, font: 'serif' | 'mono' | null) {
  if (!font) return text;
  const map = font === 'serif' ? boldSerifMap : monoMap;
  return text.replace(/[A-Za-z]/g, c => map[c] || c);
}

function applyItalic(text: string) {
  return text.replace(/[A-Za-z]/g, c => italicMap[c] || c);
}

function applyFormatting(text: string, font: 'serif' | 'mono' | null, bold: boolean, italic: boolean, underlineActive: boolean) {
  let t = text;
  if (font) t = applyFont(t, font);
  if (italic) t = applyItalic(t);
  if (underlineActive) t = underline(t);
  return t;
}

const PostFormatter: React.FC = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underlineActive, setUnderlineActive] = useState(false);

  // Load content from navigation state or localStorage
  useEffect(() => {
    const preload = localStorage.getItem('ravlo-formatter-preload');
    if (preload) {
      setContent(preload.replace(/\n/g, '\n'));
      localStorage.removeItem('ravlo-formatter-preload');
    }
  }, []);



  // Get selected text from textarea
  const getSelectedText = () => {
    const textarea = textareaRef.current;
    if (!textarea) return { text: '', start: 0, end: 0 };
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value.substring(start, end);
    
    return { text, start, end };
  };

  // Replace selected text with formatted text
  const replaceSelectedText = (newText: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    const { start, end } = getSelectedText();
    const before = content.substring(0, start);
    const after = content.substring(end);
    
    const newContent = before + newText + after;
    setContent(newContent);
    
    // Set cursor position after the formatted text
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + newText.length, start + newText.length);
    }, 0);
  };

  // Format selected text
  const formatSelectedText = (type: 'bold' | 'italic' | 'underline') => {
    const { text, start, end } = getSelectedText();
    
    if (!text) {
      toast.error("Please select some text to format");
      return;
    }

    let formattedText = text;
    
         switch (type) {
       case 'bold':
         formattedText = applyFont(text, 'serif'); // Use bold serif as default
         break;
       case 'italic':
         formattedText = applyItalic(text);
         break;
       case 'underline':
         formattedText = underline(text);
         break;
     }
    
    replaceSelectedText(formattedText);
    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} applied!`);
  };

  // Apply formatting to all text
  const formatAllText = (type: 'bold' | 'italic' | 'underline') => {
    if (!content.trim()) {
      toast.error("No text to format");
      return;
    }

    let formattedContent = content;
    
    switch (type) {
      case 'bold':
        formattedContent = applyFont(content, font);
        break;
      case 'italic':
        formattedContent = applyItalic(content);
        break;
      case 'underline':
        formattedContent = underline(content);
        break;
    }
    
    setContent(formattedContent);
    toast.success(`Applied ${type} to all text!`);
  };

  // Reset all formatting
  const resetFormatting = () => {
    if (!content.trim()) {
      toast.error("No text to reset");
      return;
    }
    
    // Convert Unicode characters back to normal
    let resetContent = content;
    
    // Reset bold serif
    Object.entries(boldSerifMap).forEach(([normal, unicode]) => {
      resetContent = resetContent.replace(new RegExp(unicode, 'g'), normal);
    });
    
    // Reset mono
    Object.entries(monoMap).forEach(([normal, unicode]) => {
      resetContent = resetContent.replace(new RegExp(unicode, 'g'), normal);
    });
    
    // Reset italic
    Object.entries(italicMap).forEach(([normal, unicode]) => {
      resetContent = resetContent.replace(new RegExp(unicode, 'g'), normal);
    });
    
    // Reset underline (remove combining low line)
    resetContent = resetContent.replace(/\u0332/g, '');
    
    setContent(resetContent);
    toast.success("Formatting reset!");
  };

  // Save or update draft
  const handleSave = () => {
    if (!content.trim()) {
      toast.error("Cannot save an empty draft.");
      return;
    }
    let drafts = JSON.parse(localStorage.getItem("ravlo-drafts") || "[]");
    if (editingId) {
      drafts = drafts.map((d: any) => d.id === editingId ? { ...d, title: title || `Draft #${d.id.slice(-4)}`, content, timestamp: Date.now() } : d);
      toast.success("Draft updated!");
    } else {
      const id = Date.now().toString();
      drafts.unshift({ id, title: title || `Draft #${drafts.length + 1}`, content, timestamp: Date.now() });
      toast.success("Draft saved!");
    }
    localStorage.setItem("ravlo-drafts", JSON.stringify(drafts));
    setEditingId(null);
    setTitle("");
    setContent("");
    setTimeout(() => window.location.href = '/saved-drafts', 800);
  };

  // Copy handler
  const handleCopy = () => {
    navigator.clipboard.writeText(content).then(() => {
      toast.success("Copied!");
    });
  };

  return (
    <>
      <Helmet>
        <title>Post Formatter – Ravlo LinkedIn Tool</title>
        <meta name="description" content="Format and style your LinkedIn posts with Unicode formatting that persists across all platforms. Bold, italic, underline, and save drafts with Ravlo." />
        <meta name="keywords" content="LinkedIn post formatter, Unicode formatting, LinkedIn text styling, post drafts, LinkedIn writing tool" />
        <meta property="og:title" content="Post Formatter – Ravlo LinkedIn Tool" />
        <meta property="og:description" content="Format and style your LinkedIn posts with Unicode formatting that persists across all platforms." />
        <meta property="og:image" content="/og-preview.png" />
        <meta property="og:url" content="https://www.ravlo.pro/post-formatter" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Post Formatter – Ravlo LinkedIn Tool" />
        <meta name="twitter:description" content="Format and style your LinkedIn posts with Unicode formatting that persists across all platforms." />
        <meta name="twitter:image" content="/og-preview.png" />
      </Helmet>
      <Navigation />
      <div className="max-w-4xl mx-auto py-12 px-4 animate-fade-in">
        <Card className="bg-gradient-to-br from-blue-50/60 via-white/80 to-blue-100/60 dark:from-slate-900/60 dark:via-slate-800/80 dark:to-blue-900/60 shadow-2xl border-2 border-primary/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <span role="img" aria-label="edit">📝</span> Post Formatter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-col md:flex-row md:items-center gap-4">
              <Input
                placeholder="Draft Title (optional)"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="md:w-1/3"
              />
              
                             <div className="flex flex-col md:flex-row gap-2">
                 <div className="flex gap-1">
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={() => formatSelectedText('bold')}
                    className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
                    title="Bold selected text"
                  >
                    <b>B</b>
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={() => formatSelectedText('italic')}
                    className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
                    title="Italic selected text"
                  >
                    <i>I</i>
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={() => formatSelectedText('underline')}
                    className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
                    title="Underline selected text"
                  >
                    <u>U</u>
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={resetFormatting}
                    className="hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                    title="Reset all formatting"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            
                         <div className="mb-4 p-3 bg-blue-50/50 dark:bg-blue-900/20 rounded-lg border border-blue-200/50 dark:border-blue-800/50">
               <p className="text-sm text-blue-700 dark:text-blue-300">
                 💡 <strong>Tip:</strong> Select text and click B/I/U to format it. B applies bold serif, I applies italic, U applies underline. 
                 All formatting uses Unicode characters that persist when copied to LinkedIn, Notes, or any platform.
               </p>
             </div>
            
                         <textarea
               ref={textareaRef}
               className="min-h-[300px] max-h-[500px] w-full rounded-lg border border-border bg-background/70 p-4 mb-4 focus:outline-primary text-base transition-all shadow-inner overflow-auto"
               placeholder="Write or paste your LinkedIn post here... Select text and use the formatting buttons above!"
               value={content}
               onChange={e => setContent(e.target.value)}
               aria-label="Post Editor"
               style={{ whiteSpace: 'pre-line' }}
             />
            
            <div className="flex gap-2 mb-2">
              <Button onClick={handleCopy} variant="outline" size="sm" className="flex items-center gap-2">
                <Copy className="w-4 h-4" /> Copy
              </Button>
            </div>
            
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