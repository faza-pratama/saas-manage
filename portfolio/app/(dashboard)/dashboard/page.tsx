"use client";

import { DashboardLayout } from "@/components/dashboard/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn, formatDate, formatRelativeTime, getInitials } from "@/lib/utils";
import {
  FolderKanban,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const stats = [
  {
    label: "Total Projects",
    value: "12",
    change: "+2 this month",
    icon: FolderKanban,
    positive: true,
    href: "/dashboard/projects",
  },
  {
    label: "Tasks Completed",
    value: "247",
    change: "+23 this week",
    icon: CheckCircle,
    positive: true,
    href: "/dashboard/tasks",
  },
  {
    label: "In Progress",
    value: "18",
    change: "-5 from last week",
    icon: Clock,
    positive: false,
    href: "/dashboard/tasks?status=in_progress",
  },
  {
    label: "Overdue",
    value: "3",
    change: "Needs attention",
    icon: AlertTriangle,
    positive: false,
    href: "/dashboard/tasks?status=overdue",
  },
];

const taskCompletionData = [
  { name: "Mon", completed: 12, created: 15 },
  { name: "Tue", completed: 19, created: 18 },
  { name: "Wed", completed: 8, created: 12 },
  { name: "Thu", completed: 24, created: 20 },
  { name: "Fri", completed: 16, created: 14 },
  { name: "Sat", completed: 5, created: 6 },
  { name: "Sun", completed: 3, created: 4 },
];

const projectProgressData = [
  { name: "Website Redesign", progress: 65, color: "#3b82f6" },
  { name: "Mobile App v2.0", progress: 15, color: "#8b5cf6" },
  { name: "API Integration", progress: 80, color: "#10b981" },
  { name: "Design System", progress: 40, color: "#f59e0b" },
  { name: "Q1 Marketing", progress: 5, color: "#ef4444" },
];

const recentProjects = [
  {
    id: "1",
    name: "Website Redesign",
    status: "Active",
    progress: 65,
    dueDate: "2024-02-15",
    tasks: { done: 13, total: 20 },
  },
  {
    id: "2",
    name: "Mobile App v2.0",
    status: "Planning",
    progress: 15,
    dueDate: "2024-03-01",
    tasks: { done: 3, total: 20 },
  },
  {
    id: "3",
    name: "API Integration",
    status: "Active",
    progress: 80,
    dueDate: "2024-01-30",
    tasks: { done: 16, total: 20 },
  },
  {
    id: "4",
    name: "Design System",
    status: "On Hold",
    progress: 40,
    dueDate: "2024-02-28",
    tasks: { done: 8, total: 20 },
  },
];

const recentActivity = [
  { id: "1", user: "Sarah Chen", action: "completed task", target: "Design login flow", time: "2h ago" },
  { id: "2", user: "Marcus Johnson", action: "created project", target: "Q1 Marketing Campaign", time: "4h ago" },
  { id: "3", user: "Emily Davis", action: "moved task to", target: "In Progress • API docs", time: "6h ago" },
  { id: "4", user: "You", action: "commented on", target: "Mobile App v2.0", time: "8h ago" },
];

function StatCard({ label, value, change, icon: Icon, positive, href }: typeof stats[0]) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="mt-1 text-3xl font-bold text-foreground">{value}</p>
            <p className="mt-1 text-sm text-muted-foreground flex items-center gap-1">
              <Icon className={cn("h-3.5 w-3.5", positive ? "text-green-500" : "text-red-500")} />
              {change}
            </p>
          </div>
          {href && (
            <a href={href} className="text-muted-foreground hover:text-foreground">
              <TrendingUp className="h-5 w-5" />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function TaskCompletionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Completion</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={taskCompletionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" tick={{ fill: "#9ca3af", fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: "#9ca3af", fontSize: 12 }} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                labelStyle={{ color: "#374151", fontWeight: 600 }}
              />
              <Area
                type="monotone"
                dataKey="completed"
                stroke="#3b82f6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorCompleted)"
              />
              <Area
                type="monotone"
                dataKey="created"
                stroke="#8b5cf6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorCreated)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded bg-blue-500" />
            <span className="text-muted-foreground">Completed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded bg-purple-500" />
            <span className="text-muted-foreground">Created</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ProjectProgressChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={projectProgressData} layout="vertical" margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis type="number" tick={{ fill: "#9ca3af", fontSize: 12 }} axisLine={false} />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                axisLine={false}
                width={140}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                labelStyle={{ color: "#374151", fontWeight: 600 }}
                formatter={(value: unknown) => [value !== undefined ? `${value}%` : "0%", "Progress"]}
              />
              <Bar dataKey="progress" radius={[0, 4, 4, 0]}>
                {projectProgressData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

function RecentProjectsTable() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Projects</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <a href="/dashboard/projects">View all</a>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="hidden lg:table-cell">Progress</TableHead>
              <TableHead className="hidden md:table-cell">Due Date</TableHead>
              <TableHead className="text-right">Tasks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentProjects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.name}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge
                    variant={
                      project.status === "Active"
                        ? "success"
                        : project.status === "Planning"
                        ? "info"
                        : project.status === "On Hold"
                        ? "warning"
                        : "secondary"
                    }
                  >
                    {project.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <div className="h-2 w-32 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">
                  {formatDate(project.dueDate)}
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {project.tasks.done}/{project.tasks.total}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function RecentActivity() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Activity</CardTitle>
        <Button variant="ghost" size="sm">View all</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivity.map((item) => (
            <div key={item.id} className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-medium text-primary">
                  {item.user.split(" ").map((n) => n[0]).join("")}
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
  );
}

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Overview of your projects and team progress
            </p>
          </div>
          <Button asChild>
            <a href="/dashboard/projects/new">
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </a>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TaskCompletionChart />
          <ProjectProgressChart />
        </div>

        {/* Recent Projects & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentProjectsTable />
          <RecentActivity />
        </div>
      </div>
    </DashboardLayout>
  );
}