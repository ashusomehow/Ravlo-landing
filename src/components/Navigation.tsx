import { Button } from "@/components/ui/button";
import { Sparkles, BarChart3, PenTool, MessageSquare, Menu, X, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import RavloLogo from "@/assets/RavloLogo.png";
import { useNavigate } from "react-router-dom";

export default function Navigation() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem('ravlo-theme');
      if (savedTheme) {
        return savedTheme;
      }
      return document.documentElement.classList.contains("dark") ? "dark" : "light";
    }
    return "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Save theme to localStorage
    localStorage.setItem('ravlo-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleGetStarted = () => {
    navigate('/?view=writer');
  };

  return (
    <nav className="bg-linkedin-light/80 backdrop-blur-lg border-b border-linkedin-gray/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <a href="/" className="flex items-center space-x-2 group cursor-pointer select-none">
            <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
              <img src={RavloLogo} alt="Ravlo Logo" className="w-8 h-8 object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-linkedin-primary-blue tracking-wide group-hover:underline">
                Ravlo
              </span>
              <span className="text-xs text-linkedin-muted -mt-1 tracking-wider">
                LinkedIn Growth Suite
              </span>
            </div>
          </a>

          {/* Desktop CTA and Theme Toggle */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="/post-formatter" className="flex items-center gap-2 text-linkedin-muted hover:text-linkedin-primary-blue font-medium transition-colors">
              <PenTool className="w-4 h-4" />
              Post Formatter
            </a>
            <a href="/saved-drafts" className="flex items-center gap-2 text-linkedin-muted hover:text-linkedin-primary-blue font-medium transition-colors">
              <BarChart3 className="w-4 h-4" />
              Saved Drafts
            </a>
            <Button
              variant="linkedin"
              size="sm"
              className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-6 py-2 text-base font-semibold"
              onClick={handleGetStarted}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Get Started Free
            </Button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-muted hover:bg-accent transition-colors duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Toggle theme"
            >
              <span className="relative block w-6 h-6">
                <Sun
                  className={`absolute inset-0 w-6 h-6 transition-all duration-500 ${theme === "dark" ? "opacity-0 scale-75 rotate-45" : "opacity-100 scale-100 rotate-0"}`}
                />
                <Moon
                  className={`absolute inset-0 w-6 h-6 transition-all duration-500 ${theme === "dark" ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-75 -rotate-45"}`}
                />
              </span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden transition-all duration-300 ease-in-out overflow-hidden",
            isMobileMenuOpen ? "max-h-40 pb-6" : "max-h-0"
          )}
        >
          <div className="flex flex-col space-y-4 pt-4">
            <a href="/post-formatter" className="flex items-center gap-2 text-muted-foreground hover:text-primary font-medium transition-colors">
              <PenTool className="w-4 h-4" />
              Post Formatter
            </a>
            <a href="/saved-drafts" className="flex items-center gap-2 text-muted-foreground hover:text-primary font-medium transition-colors">
              <BarChart3 className="w-4 h-4" />
              Saved Drafts
            </a>
            <Button
              variant="hero"
              size="sm"
              className="w-full mt-2 px-6 py-2 text-base font-semibold"
              onClick={handleGetStarted}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Get Started Free
            </Button>
            <button
              onClick={toggleTheme}
              className="self-center mt-2 p-2 rounded-full bg-muted hover:bg-accent transition-colors duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Toggle theme"
            >
              <span className="relative block w-6 h-6">
                <Sun
                  className={`absolute inset-0 w-6 h-6 transition-all duration-500 ${theme === "dark" ? "opacity-0 scale-75 rotate-45" : "opacity-100 scale-100 rotate-0"}`}
                />
                <Moon
                  className={`absolute inset-0 w-6 h-6 transition-all duration-500 ${theme === "dark" ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-75 -rotate-45"}`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}