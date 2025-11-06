import {
  BookText,
  Target,
  Bookmark,
  Sparkles,
  Library,
  TrendingUp,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: BookText,
    title: "Import Any Content",
    description:
      "Add your own text, create custom stories, notes, or learning scripts. Build your personal reading library. Save unlimited content — any length.",
  },
  {
    icon: Target,
    title: "Instant Word Translation",
    description:
      "Click any word for immediate translation. See context and usage examples. Understand grammar and part of speech. Native pronunciation audio.",
  },
  {
    icon: Bookmark,
    title: "Smart Vocabulary Builder",
    description:
      "Bookmark words you're learning. Star your most challenging words. Review with spaced repetition. Track your progress over time.",
  },
  {
    icon: Sparkles,
    title: "AI Content Generator",
    description:
      "Create personalized reading material. Choose your topics and interests. Adjust difficulty level (A1-C2). Get content tailored to your level.",
  },
  {
    icon: Library,
    title: "Curated Book Library",
    description:
      "Access thousands of books in 6 languages. Classic literature to modern stories. Filter by difficulty and genre. Track reading progress.",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description:
      "Monitor words learned. See reading statistics. Celebrate milestones. Watch your vocabulary grow.",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-12 md:py-20 ">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Learn Through Reading
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Powerful features designed to make language learning natural,
            engaging, and effective
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
