import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, TrendingUp, CheckCircle, Clock, AlertTriangle } from "lucide-react";

const stats = [
  { label: "Total Projects", value: "12", change: "+2 this month", icon: TrendingUp, positive: true },
  { label: "Tasks Completed", value: "247", change: "+23 this week", icon: CheckCircle, positive: true },
  { label: "In Progress", value: "18", change: "-5 from last week", icon: Clock, positive: false },
  { label: "Overdue", value: "3", change: "Needs attention", icon: AlertTriangle, positive: false },
];

const recentProjects = [
  { name: "Website Redesign", status: "Active", progress: 65, dueDate: "2024-02-15", tasks: { done: 13, total: 20 } },
  { name: "Mobile App v2.0", status: "Planning", progress: 15, dueDate: "2024-03-01", tasks: { done: 3, total: 20 } },
  { name: "API Integration", status: "Active", progress: 80, dueDate: "2024-01-30", tasks: { done: 16, total: 20 } },
  { name: "Design System", status: "On Hold", progress: 40, dueDate: "2024-02-28", tasks: { done: 8, total: 20 } },
];

const activity = [
  { user: "Sarah Chen", action: "completed task", target: "Design login flow", time: "2h ago" },
  { user: "Marcus Johnson", action: "created project", target: "Q1 Marketing Campaign", time: "4h ago" },
  { user: "Emily Davis", action: "moved task to", target: "In Progress • API docs", time: "6h ago" },
  { user: "You", action: "commented on", target: "Mobile App v2.0", time: "8h ago" },
];

export function DashboardPreview() {
  return (
    <section id="preview" className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            See it in action
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A glimpse of your new command center. Clean, fast, and built for focus.
          </p>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                      <p className="mt-1 text-3xl font-bold text-foreground">{stat.value}</p>
                      <p className="mt-1 text-sm text-muted-foreground flex items-center gap-1">
                        <stat.icon className={`h-3.5 w-3.5 ${stat.positive ? "text-green-500" : "text-red-500"}`} />
                        {stat.change}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Projects</CardTitle>
                <Button variant="ghost" size="sm">View all</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProjects.map((project) => (
                    <div key={project.name} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <h4 className="font-medium text-foreground truncate">{project.name}</h4>
                          <Badge variant={project.status === "Active" ? "success" : project.status === "Planning" ? "info" : project.status === "On Hold" ? "warning" : "secondary"}>
                            {project.status}
                          </Badge>
                        </div>
                        <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                            {project.tasks.done}/{project.tasks.total} tasks
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            Due {new Date(project.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </span>
                        </div>
                        <div className="mt-2 h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${project.progress}%` }} />
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="ml-4">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Activity</CardTitle>
                <Button variant="ghost" size="sm">View all</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activity.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-medium text-primary">
                          {item.user.split(" ").map(n => n[0]).join("")}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground">
                          <span className="font-medium">{item.user}</span> {item.action}{" "}
                          <span className="font-medium">{item.target}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}