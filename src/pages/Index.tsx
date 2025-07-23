import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Users, Zap, BookOpen, Lightbulb, ArrowRight, Check, Star } from "lucide-react";
import Navigation from "@/components/Navigation";
import AIPostWriter from "@/components/AIPostWriter";
import heroImage from "@/assets/hero-image.jpg";
import { getCategoryStats } from "@/lib/hooks";
import { useSearchParams } from "react-router-dom";

const Index = () => {
  const [searchParams] = useSearchParams();
  const [currentView, setCurrentView] = useState<"landing" | "writer">(() => {
    return searchParams.get('view') === 'writer' ? 'writer' : 'landing';
  });
  const hookStats = getCategoryStats();

  // Update view when URL parameters change
  useEffect(() => {
    const view = searchParams.get('view');
    if (view === 'writer') {
      setCurrentView('writer');
    } else {
      setCurrentView('landing');
    }
  }, [searchParams]);

  if (currentView === "writer") {
    return (
      <div className="min-h-screen bg-background animate-fade-in">
        <Navigation />
        <AIPostWriter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Navigation />
      
      {/* Floating Geometric Elements */}
      <div className="floating-shapes">
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
      </div>
      
      {/* Hero Section */}
      <section className="relative py-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  🚀 Master LinkedIn Growth with AI
                </Badge>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                  <span className="bg-gradient-hero bg-clip-text text-transparent">
                    Ravlo
                  </span>
                  <br />
                  <span className="text-foreground">
                    Grow Your LinkedIn
                  </span>
                  <br />
                  <span className="text-foreground">
                    with AI-Powered Hooks
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Master LinkedIn growth with {hookStats.total} proven hook templates, 
                  AI-powered content creation, and advanced analytics to optimize your engagement.
                </p>
              </div>

              {/* Button Section - Left aligned with margin */}
              <div className="mt-8 mb-6">
                <Button 
                  variant="hero" 
                  size="xl"
                  onClick={() => setCurrentView("writer")}
                  className="group btn-premium"
                >
                  Start Growing with Ravlo
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{hookStats.total}</div>
                  <div className="text-sm text-muted-foreground">Hook Templates</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">10k+</div>
                  <div className="text-sm text-muted-foreground">Posts Created</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">3x</div>
                  <div className="text-sm text-muted-foreground">Avg. Engagement</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-3xl opacity-20" />
              <img
                src={heroImage}
                alt="LinkedIn Growth Platform"
                className="relative rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Hook Categories Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Proven Hook Templates That
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Drive Engagement</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose from {hookStats.total} carefully crafted hook templates across 3 categories, 
              each designed to maximize LinkedIn engagement and grow your audience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-card">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Curiosity Hooks</CardTitle>
                <Badge variant="secondary">{hookStats.curiosity} templates</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-center">
                  Generate curiosity and intrigue to make readers want to know more
                </CardDescription>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">"Did you know that..."</div>
                  <div className="text-sm text-muted-foreground">"X Mistakes that..."</div>
                  <div className="text-sm text-muted-foreground">"Here are the 9 secrets..."</div>
                </div>
                <div className="flex items-center justify-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">4.8 avg engagement</span>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-card">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Story Hooks</CardTitle>
                <Badge variant="secondary">{hookStats.story} templates</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-center">
                  Start compelling stories that draw readers in emotionally
                </CardDescription>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">"I got fired..."</div>
                  <div className="text-sm text-muted-foreground">"Imagine you're..."</div>
                  <div className="text-sm text-muted-foreground">"I want to tell you a story..."</div>
                </div>
                <div className="flex items-center justify-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">5.2 avg engagement</span>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-card">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Provoke Hooks</CardTitle>
                <Badge variant="secondary">{hookStats.provoke} templates</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-center">
                  Challenge conventional thinking and spark discussions
                </CardDescription>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">"Someone has to say this..."</div>
                  <div className="text-sm text-muted-foreground">"Unpopular opinion..."</div>
                  <div className="text-sm text-muted-foreground">"I want to be real..."</div>
                </div>
                <div className="flex items-center justify-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">6.1 avg engagement</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Why <span className="bg-gradient-primary bg-clip-text text-transparent">Ravlo?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ravlo isn’t just another writing tool — it’s your daily content partner.<br />Here’s how it makes your life easier:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-background/80 shadow-lg border border-border/30">
              <span className="text-3xl">⚡</span>
              <div>
                <h3 className="text-lg font-semibold mb-1">Generate Posts in Seconds</h3>
                <p className="text-muted-foreground">Go from idea to scroll-stopping post instantly, using proven high-engagement formats.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-background/80 shadow-lg border border-border/30">
              <span className="text-3xl">📥</span>
              <div>
                <h3 className="text-lg font-semibold mb-1">Save to Drafts & Reuse</h3>
                <p className="text-muted-foreground">Plan ahead. Save your posts as drafts and refine or reuse them whenever you want.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-background/80 shadow-lg border border-border/30">
              <span className="text-3xl">📅</span>
              <div>
                <h3 className="text-lg font-semibold mb-1">Stay Consistent, Effortlessly</h3>
                <p className="text-muted-foreground">Build your personal brand by showing up daily — without the daily grind.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-background/80 shadow-lg border border-border/30">
              <span className="text-3xl">📈</span>
              <div>
                <h3 className="text-lg font-semibold mb-1">Boost Productivity</h3>
                <p className="text-muted-foreground">No more blank screens. Ravlo helps you create faster, smarter, and more often.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Ready to Transform Your
              <span className="bg-gradient-hero bg-clip-text text-transparent"> LinkedIn Growth?</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of professionals who are already using Ravlo to create 
              engaging content and grow their LinkedIn presence.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero" 
              size="xl"
              onClick={() => setCurrentView("writer")}
              className="group btn-premium"
            >
              Start Creating Posts Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-8 pt-8">
            <div className="flex items-center space-x-1">
              <Check className="w-5 h-5 text-green-500" />
              <span className="text-sm">No LinkedIn extension needed</span>
            </div>
            <div className="flex items-center space-x-1">
              <Check className="w-5 h-5 text-green-500" />
              <span className="text-sm">Free to start</span>
            </div>
            <div className="flex items-center space-x-1">
              <Check className="w-5 h-5 text-green-500" />
              <span className="text-sm">Instant results</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
