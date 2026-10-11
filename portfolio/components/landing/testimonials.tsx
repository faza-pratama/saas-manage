import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    content: "NexaFlow transformed how our team manages projects. The Kanban boards are intuitive, and the analytics help us identify bottlenecks instantly. We've reduced our delivery time by 30%.",
    author: "Sarah Chen",
    role: "Engineering Lead at TechCorp",
    avatar: "SC",
    rating: 5,
  },
  {
    content: "Finally, a project management tool that doesn't get in the way. Clean interface, powerful features, and the team actually enjoys using it. The AI prioritization is a game-changer.",
    author: "Marcus Johnson",
    role: "Product Manager at StartupXYZ",
    avatar: "MJ",
    rating: 5,
  },
  {
    content: "We evaluated 10+ tools before choosing NexaFlow. The combination of simplicity and depth is unmatched. Our entire organization of 200+ people migrated in two weeks.",
    author: "Emily Davis",
    role: "VP Operations at ScaleUp Inc",
    avatar: "ED",
    rating: 5,
  },
  {
    content: "The analytics dashboard alone is worth the price. We can now forecast delivery dates with 90%+ accuracy. Customer support is also incredibly responsive.",
    author: "James Wilson",
    role: "CTO at DevStudio",
    avatar: "JW",
    rating: 5,
  },
  {
    content: "As a remote-first company, we needed something that keeps everyone aligned. NexaFlow's activity feed and real-time updates make it feel like we're all in the same room.",
    author: "Lisa Park",
    role: "Founder at RemoteFirst Co",
    avatar: "LP",
    rating: 5,
  },
  {
    content: "Migrating from Jira was the best decision we made this year. Half the complexity, twice the speed. Our developers actually update their tasks now!",
    author: "David Kim",
    role: "Engineering Manager at CloudNine",
    avatar: "DK",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Trusted by high-performing teams
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Don&apos;t just take our word for it. Here&apos;s what our customers have to say.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.author} className="h-full">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-foreground mb-6 leading-relaxed">&ldquo;{testimonial.content}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${testimonial.avatar}`} alt="" />
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-muted-foreground">
          * Testimonials feature sample content with fictional names and companies for demonstration purposes.
        </p>
      </div>
    </section>
  );
}