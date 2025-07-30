import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Lightbulb, BookOpen, Zap, TrendingUp, Users, Star, Shuffle, Gift, Dice5, RefreshCcw } from "lucide-react";
import { HookCategory, HookTemplate, getHooksByCategory, getCategoryStats } from "@/lib/hooks";
import { cn } from "@/lib/utils";

interface HookSelectorProps {
  selectedCategory?: HookCategory;
  selectedTemplate?: HookTemplate;
  onCategoryChange: (category: HookCategory) => void;
  onTemplateChange: (template: HookTemplate) => void;
  className?: string;
}

const categoryIcons = {
  curiosity: Lightbulb,
  story: BookOpen,
  provoke: Zap,
};

const categoryDescriptions = {
  curiosity: "Generate curiosity and intrigue to make readers want to know more",
  story: "Start compelling stories that draw readers in emotionally",
  provoke: "Challenge conventional thinking and spark discussions",
};

// Utility to get a random icon
const randomIcons = [Shuffle, Gift, Dice5, RefreshCcw];
function getRandomIcon() {
  return randomIcons[Math.floor(Math.random() * randomIcons.length)];
}

export default function HookSelector({
  selectedCategory,
  selectedTemplate,
  onCategoryChange,
  onTemplateChange,
  className,
}: HookSelectorProps) {
  const [hoveredCategory, setHoveredCategory] = useState<HookCategory | null>(null);
  const stats = getCategoryStats() || { curiosity: 0, story: 0, provoke: 0, total: 0 };
  const [randomIconIdx, setRandomIconIdx] = useState(Math.floor(Math.random() * randomIcons.length));

  const handleCategorySelect = (category: HookCategory) => {
    try {
      onCategoryChange(category);
      // Do not auto-select the first template in the category
      onTemplateChange(undefined);
    } catch (error) {
      console.error('Error selecting category:', error);
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    try {
      if (templateId === "no-hook") {
        // "No Hook" selected
        onTemplateChange(undefined);
        return;
      }
      
      if (selectedCategory) {
        const templates = getHooksByCategory(selectedCategory);
        const template = templates.find(t => t.id === templateId);
        if (template) {
          onTemplateChange(template);
        }
      }
    } catch (error) {
      console.error('Error selecting template:', error);
    }
  };

  const handleRandomHook = () => {
    try {
      if (selectedCategory) {
        const hooks = getHooksByCategory(selectedCategory);
        if (hooks.length > 0) {
          const randomIdx = Math.floor(Math.random() * hooks.length);
          onTemplateChange(hooks[randomIdx]);
          setRandomIconIdx(Math.floor(Math.random() * randomIcons.length));
        }
      }
    } catch (error) {
      console.error('Error selecting random hook:', error);
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Category Selection */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Choose Hook Category</h3>
          <Badge variant="secondary" className="text-xs">
            {stats.total} total hooks
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(Object.keys(categoryIcons) as HookCategory[]).map((category) => {
            const Icon = categoryIcons[category];
            const isSelected = selectedCategory === category;
            const isHovered = hoveredCategory === category;
            const count = stats[category];

            return (
              <Card
                key={category}
                className={cn(
                  "cursor-pointer transition-all duration-200 hover:shadow-lg group",
                  isSelected && "ring-2 ring-primary shadow-lg bg-gradient-secondary"
                )}
                onMouseEnter={() => setHoveredCategory(category)}
                onMouseLeave={() => setHoveredCategory(null)}
                onClick={() => handleCategorySelect(category)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Icon className={cn(
                      "w-6 h-6 transition-colors",
                      isSelected ? "text-primary" : "text-muted-foreground"
                    )} />
                    <Badge variant={isSelected ? "default" : "secondary"}>
                      {count} hooks
                    </Badge>
                  </div>
                  <CardTitle className={cn(
                    "capitalize text-base",
                    isSelected && "text-primary"
                  )}>
                    {category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-sm">
                    {categoryDescriptions[category]}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Template Selection */}
      {selectedCategory && (
        <>
          <Separator />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Select Hook Template</h3>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Performance based</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-2 w-full">
                             <Select
                 value={selectedTemplate?.id || "no-hook"}
                 onValueChange={handleTemplateSelect}
               >
                <SelectTrigger className="w-full md:w-auto">
                  <SelectValue placeholder="Choose a hook template..." />
                </SelectTrigger>
                                 <SelectContent className="max-h-60">
                   <SelectItem key="no-hook" value="no-hook">
                     <span className="italic text-muted-foreground">No Hook</span>
                   </SelectItem>
                   {getHooksByCategory(selectedCategory)
                     .sort((a, b) => (b.engagementScore || 0) - (a.engagementScore || 0))
                     .map((template) => (
                       <SelectItem key={template.id} value={template.id}>
                         <div className="flex items-center justify-between w-full">
                           <span className="truncate max-w-[140px] md:max-w-[200px]">
                             {template.template}
                           </span>
                           <div className="flex items-center space-x-2 ml-2">
                             <div className="flex items-center space-x-1">
                               <Star className="w-3 h-3 text-yellow-500 fill-current" />
                               <span className="text-xs text-muted-foreground">
                                 {template.engagementScore?.toFixed(1)}
                               </span>
                             </div>
                             <div className="flex items-center space-x-1">
                               <Users className="w-3 h-3 text-muted-foreground" />
                               <span className="text-xs text-muted-foreground">
                                 {template.usageCount}
                               </span>
                             </div>
                           </div>
                         </div>
                       </SelectItem>
                     ))}
                 </SelectContent>
              </Select>
              <Button type="button" variant="outline" size="sm" onClick={handleRandomHook} title="Select a random hook" className="flex items-center gap-2 w-full md:w-auto">
                {(() => {
                  const Icon = randomIcons[randomIconIdx];
                  return <Icon className="w-5 h-5" />;
                })()}
                <span>Random Hook</span>
              </Button>
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              Hooks are <span className="font-semibold text-primary">recommended</span> for higher engagement, but you can proceed without one.
            </div>

            {/* Template Preview */}
            {selectedTemplate && (
              <Card className="bg-gradient-secondary border-primary/20">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Selected Hook</CardTitle>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs text-muted-foreground">
                          {selectedTemplate.engagementScore?.toFixed(1)} avg engagement
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          Used {selectedTemplate.usageCount} times
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium text-primary">
                    "{selectedTemplate.template}"
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </>
      )}
    </div>
  );
}