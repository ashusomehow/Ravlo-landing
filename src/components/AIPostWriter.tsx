import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Loader2, Copy, Check, Sparkles, FileText, MessageSquare, ChevronDown, ChevronUp, Settings } from "lucide-react";
import { toast } from "sonner";
import HookSelector from "./HookSelector";
import { HookCategory, HookTemplate } from "@/lib/hooks";
import { generatePost, GeneratePostRequest } from "@/lib/gemini";
import { cn } from "@/lib/utils";
import React from "react";
import { Switch } from "@/components/ui/switch";

// Helper function to convert markdown-style bold to HTML
const formatBoldText = (text: string) => {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
};

export default function AIPostWriter() {
  const [selectedCategory, setSelectedCategory] = useState<HookCategory>();
  const [selectedTemplate, setSelectedTemplate] = useState<HookTemplate>();
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState<"Professional" | "Casual" | "Motivational" | "Analytical">("Professional");
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPosts, setGeneratedPosts] = useState<{ concise: string; storyRich: string } | null>(null);
  const [copiedVersion, setCopiedVersion] = useState<"concise" | "storyRich" | null>(null);
  const [useEmojis, setUseEmojis] = useState(false);
  const [addHashtags, setAddHashtags] = useState(false);
  const [useBullets, setUseBullets] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  const handleGenerate = async () => {
    if (!selectedCategory || !topic.trim()) {
      toast.error("Please select a hook category and enter a topic");
      return;
    }

    setIsGenerating(true);
    setGeneratedPosts(null);

    try {
      // Get an engaging fallback hook based on the selected category
      const getFallbackHook = (category: HookCategory) => {
        const fallbackHooks = {
          curiosity: "Did you know that...",
          story: "I want to tell you a story about...",
          provoke: "Someone has to say this...",
        };
        return fallbackHooks[category] || "Here's something that might surprise you...";
      };

      const request: GeneratePostRequest = {
        topic: topic.trim(),
        tone,
        hookCategory: selectedCategory,
        hookTemplate: selectedTemplate?.template || getFallbackHook(selectedCategory),
        description: description.trim() || undefined,
        useEmojis,
        addHashtags,
        useBullets,
      };

      const response = await generatePost(request);
      setGeneratedPosts(response);
      toast.success("Posts generated successfully!");
    } catch (error) {
      console.error("Error generating posts:", error);
      toast.error("Failed to generate posts. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async (text: string, version: "concise" | "storyRich") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedVersion(version);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopiedVersion(null), 2000);
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const isFormValid = selectedCategory && topic.trim();

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Simplified Header */}
      <div className="text-center space-y-4 animate-fade-in">
        <div className="flex items-center justify-center space-x-3">
          <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              AI Post Writer
            </h1>
            <p className="text-sm text-muted-foreground">Create engaging LinkedIn posts in seconds</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Simplified Input Section */}
        <div className="space-y-4">
          {/* Essential Fields Card */}
          <Card className="border border-border/50 bg-background/50 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                <span>Quick Start</span>
              </CardTitle>
              <CardDescription>
                Just fill these two fields to get started
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Hook Selection - Simplified */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Hook Category *</Label>
                <Select value={selectedCategory} onValueChange={(value: any) => setSelectedCategory(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a category..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="curiosity">Curiosity Hooks</SelectItem>
                    <SelectItem value="story">Story Hooks</SelectItem>
                    <SelectItem value="provoke">Provocative Hooks</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Topic Input */}
              <div className="space-y-2">
                <Label htmlFor="topic" className="text-sm font-medium">What's your post about? *</Label>
                <Input
                  id="topic"
                  placeholder="e.g., Remote work productivity tips"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Generate Button - Prominent */}
              <Button
                onClick={handleGenerate}
                disabled={!isFormValid || isGenerating}
                className="w-full relative overflow-hidden group"
                variant="hero"
                size="lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-brand-purple to-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    <span className="animate-pulse">Creating your post...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Post
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Advanced Options - Collapsible */}
          <Card className="border border-border/50 bg-background/50 shadow-sm">
            <CardHeader 
              className="pb-4 cursor-pointer hover:bg-muted/30 transition-colors"
              onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
            >
              <CardTitle className="text-lg flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-muted-foreground" />
                  <span>Customize (Optional)</span>
                </div>
                {showAdvancedOptions ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </CardTitle>
              <CardDescription>
                Fine-tune your post with additional options
              </CardDescription>
            </CardHeader>
            
            {showAdvancedOptions && (
              <CardContent className="space-y-4 pt-0">
                <Separator />
                
                {/* Hook Template Selection */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Specific Hook Template</Label>
                  <HookSelector
                    selectedCategory={selectedCategory}
                    selectedTemplate={selectedTemplate}
                    onCategoryChange={setSelectedCategory}
                    onTemplateChange={setSelectedTemplate}
                  />
                </div>

                {/* Tone Selection */}
                <div className="space-y-2">
                  <Label htmlFor="tone" className="text-sm font-medium">Writing Tone</Label>
                  <Select value={tone} onValueChange={(value: any) => setTone(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Professional">Professional</SelectItem>
                      <SelectItem value="Casual">Casual</SelectItem>
                      <SelectItem value="Motivational">Motivational</SelectItem>
                      <SelectItem value="Analytical">Analytical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Additional Context */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">Additional Context</Label>
                  <Textarea
                    id="description"
                    placeholder="Any specific details or personal experience..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                  />
                </div>

                {/* Post Formatting Options - Simplified */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Formatting Options</Label>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-background/30">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="useEmojis"
                          checked={useEmojis}
                          onCheckedChange={setUseEmojis}
                        />
                        <Label htmlFor="useEmojis" className="text-sm">Include Emojis</Label>
                      </div>
                      <span className="text-xs text-muted-foreground">Modern posts typically avoid emojis</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-background/30">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="addHashtags"
                          checked={addHashtags}
                          onCheckedChange={setAddHashtags}
                        />
                        <Label htmlFor="addHashtags" className="text-sm">Add Hashtags</Label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-background/30">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="useBullets"
                          checked={useBullets}
                          onCheckedChange={setUseBullets}
                        />
                        <Label htmlFor="useBullets" className="text-sm">Use Bullet Points</Label>
                      </div>
                      <span className="text-xs text-muted-foreground">Modern posts typically use this</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </div>

        {/* Output Section - Simplified */}
        <div className="space-y-4">
          {isGenerating ? (
            <>
              {/* Loading State - Simplified */}
              <Card className="border border-border/50 bg-background/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center space-x-3">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    <span className="text-muted-foreground">Creating your post...</span>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : generatedPosts ? (
            <>
              {/* Generated Posts - Simplified */}
              <Card className="border border-border/50 bg-background/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <span>Your Generated Post</span>
                  </CardTitle>
                  <CardDescription>
                    Copy, edit, or send to formatter
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-muted/30 rounded-lg border">
                    <div 
                      className="whitespace-pre-wrap text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: formatBoldText(generatedPosts.concise) }}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(generatedPosts.concise, "concise")}
                      className="flex-1"
                    >
                      {copiedVersion === "concise" ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </>
                      )}
                    </Button>
                    
                    <Button
                      variant="secondary"
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setTimeout(() => {
                          if (typeof window !== 'undefined') {
                            window.location.href = '/post-formatter';
                            localStorage.setItem('ravlo-formatter-preload', generatedPosts.concise);
                          }
                        }, 200);
                      }}
                    >
                      ✍️ Edit in Formatter
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            // Empty State - Encouraging
            <Card className="border border-border/50 bg-background/50">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">Ready to create?</h3>
                <p className="text-muted-foreground text-sm">
                  Select a hook category and enter your topic to generate an engaging LinkedIn post
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}