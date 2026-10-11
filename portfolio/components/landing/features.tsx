import { 
  Kanban, 
  BarChart3, 
  Users, 
  Calendar, 
  Bell, 
  Shield,
  Zap,
  Brain
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Kanban,
    title: "Kanban Boards",
    description: "Visualize your workflow with drag-and-drop Kanban boards. Move tasks between columns effortlessly and keep your team aligned.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    description: "Track team velocity, project progress, and bottlenecks with beautiful charts. Make data-driven decisions with real-time insights.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Assign tasks, mention teammates, and discuss work in context. Built-in comments and activity feeds keep everyone in the loop.",
  },
  {
    icon: Calendar,
    title: "Deadline Management",
    description: "Never miss a deadline. Smart scheduling, automatic reminders, and timeline views help you deliver on time, every time.",
  },
  {
    icon: Brain,
    title: "AI-Powered Insights",
    description: "Get intelligent task prioritization, workload balancing suggestions, and predictive delivery dates powered by machine learning.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 compliant with SSO, RBAC, and audit logs. Your data is encrypted at rest and in transit with industry-leading standards.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built on modern edge infrastructure for instant page loads and real-time updates. No waiting, no lag — just work.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Stay informed without the noise. Customize notification rules, digest emails, and in-app alerts tailored to your workflow.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 lg:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to ship faster
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Powerful features designed for modern software teams. No bloat, just tools that work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="h-full transition-shadow hover:shadow-lg">
              <CardHeader>
                <feature.icon className="h-10 w-10 text-primary mb-4" aria-hidden="true" />
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}