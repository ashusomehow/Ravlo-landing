import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
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

const SavedDrafts: React.FC = () => {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setDrafts(getDrafts());
  }, []);

  const handleOpen = (draft: Draft) => {
    navigate("/post-formatter", { state: { ...draft } });
  };

  const handleDelete = (id: string) => {
    const updated = drafts.filter(d => d.id !== id);
    saveDrafts(updated);
    setDrafts(updated);
  };

  return (
    <>
      <Navigation />
      <div className="max-w-5xl mx-auto py-12 px-4 animate-fade-in">
        <h1 className="text-3xl font-bold mb-8">Saved Drafts</h1>
        {drafts.length === 0 ? (
          <div className="text-muted-foreground text-center">No drafts saved yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {drafts.map(draft => (
              <Card key={draft.id} className="bg-gradient-to-br from-blue-50/60 via-white/80 to-blue-100/60 dark:from-slate-900/60 dark:via-slate-800/80 dark:to-blue-900/60 shadow-xl border-2 border-primary/10 backdrop-blur-xl transition-all hover:scale-105">
                <CardHeader>
                  <CardTitle className="truncate text-lg font-semibold">{draft.title || "Untitled Draft"}</CardTitle>
                  <div className="text-xs text-muted-foreground mt-1">{new Date(draft.timestamp).toLocaleString()}</div>
                </CardHeader>
                <CardContent>
                  <div className="line-clamp-4 text-sm mb-4" dangerouslySetInnerHTML={{ __html: draft.content }} />
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary" onClick={() => handleOpen(draft)} className="flex-1">Edit</Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(draft.id)} className="flex-1">Delete</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SavedDrafts; 