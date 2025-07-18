import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Loader2, Copy, Check, Sparkles, FileText, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import HookSelector from "./HookSelector";
import { HookCategory, HookTemplate } from "@/lib/hooks";
import { generatePost, GeneratePostRequest } from "@/lib/gemini";
import { cn } from "@/lib/utils";

export default function AIPostWriter() {
  const [selectedCategory, setSelectedCategory] = useState<HookCategory>();
  const [selectedTemplate, setSelectedTemplate] = useState<HookTemplate>();
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState<"Professional" | "Casual" | "Motivational" | "Analytical">("Professional");
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPosts, setGeneratedPosts] = useState<{ concise: string; storyRich: string } | null>(null);
  const [copiedVersion, setCopiedVersion] = useState<"concise" | "storyRich" | null>(null);

  const handleGenerate = async () => {
    if (!selectedCategory || !selectedTemplate || !topic.trim()) {
      toast.error("Please select a hook category, template, and enter a topic");
      return;
    }

    setIsGenerating(true);
    setGeneratedPosts(null);

    try {
      const request: GeneratePostRequest = {
        topic: topic.trim(),
        tone,
        hookCategory: selectedCategory,
        hookTemplate: selectedTemplate.template,
        description: description.trim() || undefined,
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

  const isFormValid = selectedCategory && selectedTemplate && topic.trim();

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-6 animate-fade-in">
        <div className="flex items-center justify-center space-x-4">
          <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              AI Post Writer
            </h1>
            <div className="flex items-center justify-center space-x-2">
              <span className="px-3 py-1 bg-brand-green/10 text-brand-green text-sm font-medium rounded-full border border-brand-green/20">
                ✨ 100% Free Tool
              </span>
              <span className="px-3 py-1 bg-brand-purple/10 text-brand-purple text-sm font-medium rounded-full border border-brand-purple/20">
                🚀 97 Hook Templates
              </span>
            </div>
          </div>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
          Create engaging LinkedIn posts using proven hook templates and AI-powered content generation. 
          <span className="text-primary font-medium">No signup required!</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Hook Selection */}
          <Card className="border-2 border-primary/10 bg-gradient-to-br from-primary/5 via-transparent to-brand-purple/5 hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                <span>Hook Templates</span>
                <span className="ml-auto px-2 py-1 bg-brand-green/10 text-brand-green text-xs font-medium rounded-full">
                  97 Templates
                </span>
              </CardTitle>
              <CardDescription>
                Choose from our collection of proven hook templates that drive engagement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <HookSelector
                selectedCategory={selectedCategory}
                selectedTemplate={selectedTemplate}
                onCategoryChange={setSelectedCategory}
                onTemplateChange={setSelectedTemplate}
              />
            </CardContent>
          </Card>

          {/* Content Configuration */}
          <Card className="border-2 border-brand-purple/10 bg-gradient-to-br from-brand-purple/5 via-transparent to-primary/5 hover:border-brand-purple/20 transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-brand-purple to-primary rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <span>Content Details</span>
              </CardTitle>
              <CardDescription>
                Provide topic and context for your LinkedIn post
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="topic">Topic *</Label>
                <Input
                  id="topic"
                  placeholder="e.g., Remote work productivity tips"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tone">Tone</Label>
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

              <div className="space-y-2">
                <Label htmlFor="description">Additional Context (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Any specific details, personal experience, or context you'd like to include..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

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
                    <span className="animate-pulse">Generating Posts...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate LinkedIn Posts
                    <div className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                      FREE
                    </div>
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Output Section */}
        <div className="space-y-6">
          {generatedPosts ? (
            <>
              {/* Concise Version */}
              <Card className="border-2 border-brand-green/30 bg-gradient-to-br from-brand-green/10 via-brand-green/5 to-transparent hover:border-brand-green/40 transition-all duration-300 hover:shadow-lg animate-scale-in">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-3">
                      <Badge variant="secondary" className="bg-brand-green/20 text-brand-green border border-brand-green/30 px-3 py-1">
                        ⚡ Concise
                      </Badge>
                      <span className="text-sm font-medium text-muted-foreground">≤150 words</span>
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(generatedPosts.concise, "concise")}
                      className="hover:bg-brand-green/10 hover:border-brand-green/30 transition-all duration-200 hover:scale-105"
                    >
                      {copiedVersion === "concise" ? (
                        <>
                          <Check className="w-4 h-4 text-brand-green mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans text-foreground bg-background/50 p-4 rounded-lg border border-border/50">
                      {generatedPosts.concise}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              {/* Story-Rich Version */}
              <Card className="border-2 border-brand-purple/30 bg-gradient-to-br from-brand-purple/10 via-brand-purple/5 to-transparent hover:border-brand-purple/40 transition-all duration-300 hover:shadow-lg animate-scale-in">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-3">
                      <Badge variant="secondary" className="bg-brand-purple/20 text-brand-purple border border-brand-purple/30 px-3 py-1">
                        📖 Story-Rich
                      </Badge>
                      <span className="text-sm font-medium text-muted-foreground">≤300 words</span>
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(generatedPosts.storyRich, "storyRich")}
                      className="hover:bg-brand-purple/10 hover:border-brand-purple/30 transition-all duration-200 hover:scale-105"
                    >
                      {copiedVersion === "storyRich" ? (
                        <>
                          <Check className="w-4 h-4 text-brand-purple mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans text-foreground bg-background/50 p-4 rounded-lg border border-border/50">
                      {generatedPosts.storyRich}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <Button 
                  variant="secondary" 
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="flex-1 relative overflow-hidden group hover:scale-105 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-brand-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      <span className="animate-pulse">Regenerating...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Regenerate Posts
                      <span className="ml-2 text-xs opacity-70">FREE</span>
                    </>
                  )}
                </Button>
              </div>
            </>
          ) : (
            <Card className="h-64 border-dashed border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-brand-purple/5 hover:border-primary/30 transition-all duration-300">
              <CardContent className="h-full flex items-center justify-center">
                <div className="text-center space-y-4 animate-fade-in">
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto shadow-lg animate-pulse">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-foreground font-medium">
                      Your AI-generated posts will appear here ✨
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Fill in the form and click generate to create engaging LinkedIn posts
                    </p>
                    <div className="flex items-center justify-center space-x-2 mt-3">
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-brand-purple rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></span>
                      <span className="w-2 h-2 bg-brand-green rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}