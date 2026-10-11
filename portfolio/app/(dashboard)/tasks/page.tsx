"use client";

import { useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, MoreHorizontal, TrendingUp, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { cn, formatDate, formatRelativeTime, getInitials } from "@/lib/utils";

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "todo", label: "Todo" },
  { value: "in_progress", label: "In Progress" },
  { value: "done", label: "Done" },
];

const priorityOptions = [
  { value: "all", label: "All Priorities" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const projectOptions = [
  { value: "all", label: "All Projects" },
  { value: "1", label: "Website Redesign" },
  { value: "2", label: "Mobile App v2.0" },
  { value: "3", label: "API Integration" },
  { value: "4", label: "Design System" },
  { value: "5", label: "Q1 Marketing Campaign" },
];

const sortOptions = [
  { value: "created_desc", label: "Newest First" },
  { value: "created_asc", label: "Oldest First" },
  { value: "due_date_asc", label: "Due Date (Soonest)" },
  { value: "due_date_desc", label: "Due Date (Latest)" },
  { value: "priority_desc", label: "Priority (High to Low)" },
  { value: "priority_asc", label: "Priority (Low to High)" },
];

const tasks = [
  {
    id: "1",
    title: "Design system audit",
    description: "Review and document current design system components",
    status: "done",
    priority: "high",
    projectId: "1",
    projectName: "Website Redesign",
    assignee: "Sarah Chen",
    dueDate: "2024-01-15",
    createdAt: "2024-01-02T10:00:00Z",
  },
  {
    id: "2",
    title: "Create wireframes",
    description: "Create low-fidelity wireframes for all pages",
    status: "done",
    priority: "high",
    projectId: "1",
    projectName: "Website Redesign",
    assignee: "Sarah Chen",
    dueDate: "2024-01-20",
    createdAt: "2024-01-03T14:00:00Z",
  },
  {
    id: "3",
    title: "Design homepage",
    description: "Design the new homepage with hero, features, and testimonials",
    status: "done",
    priority: "high",
    projectId: "1",
    projectName: "Website Redesign",
    assignee: "Sarah Chen",
    dueDate: "2024-01-25",
    createdAt: "2024-01-05T09:00:00Z",
  },
  {
    id: "4",
    title: "Design product pages",
    description: "Design product listing and detail pages",
    status: "in_progress",
    priority: "medium",
    projectId: "1",
    projectName: "Website Redesign",
    assignee: "Marcus Johnson",
    dueDate: "2024-02-01",
    createdAt: "2024-01-10T11:00:00Z",
  },
  {
    id: "5",
    title: "Implement header component",
    description: "Build responsive header with navigation and user menu",
    status: "in_progress",
    priority: "high",
    projectId: "1",
    projectName: "Website Redesign",
    assignee: "Marcus Johnson",
    dueDate: "2024-02-05",
    createdAt: "2024-01-12T16:00:00Z",
  },
  {
    id: "6",
    title: "API authentication setup",
    description: "Configure OAuth2 and JWT authentication",
    status: "done",
    priority: "urgent",
    projectId: "3",
    projectName: "API Integration",
    assignee: "Marcus Johnson",
    dueDate: "2024-01-20",
    createdAt: "2024-01-11T10:00:00Z",
  },
  {
    id: "7",
    title: "Payment gateway integration",
    description: "Integrate Stripe payment processing",
    status: "in_progress",
    priority: "high",
    projectId: "3",
    projectName: "API Integration",
    assignee: "Marcus Johnson",
    dueDate: "2024-01-28",
    createdAt: "2024-01-15T14:00:00Z",
  },
  {
    id: "8",
    title: "Shipping API integration",
    description: "Connect with FedEx and UPS APIs",
    status: "todo",
    priority: "medium",
    projectId: "3",
    projectName: "API Integration",
    assignee: "Marcus Johnson",
    dueDate: "2024-02-05",
    createdAt: "2024-01-18T09:00:00Z",
  },
  {
    id: "9",
    title: "Mobile app onboarding flow",
    description: "Design and implement new user onboarding",
    status: "todo",
    priority: "medium",
    projectId: "2",
    projectName: "Mobile App v2.0",
    assignee: "Emily Davis",
    dueDate: "2024-02-10",
    createdAt: "2024-01-20T11:00:00Z",
  },
  {
    id: "10",
    title: "Push notification setup",
    description: "Configure Firebase push notifications",
    status: "todo",
    priority: "high",
    projectId: "2",
    projectName: "Mobile App v2.0",
    assignee: "Emily Davis",
    dueDate: "2024-02-15",
    createdAt: "2024-01-22T10:00:00Z",
  },
];

function getStatusBadge(status: string) {
  const variants: Record<string, "success" | "default" | "secondary"> = {
    done: "success",
    in_progress: "default",
    todo: "secondary",
  };
  return variants[status] || "secondary";
}

function getPriorityBadge(priority: string) {
  const variants: Record<string, "destructive" | "warning" | "info" | "secondary"> = {
    urgent: "destructive",
    high: "destructive",
    medium: "warning",
    low: "info",
  };
  return variants[priority] || "secondary";
}

export default function TasksPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [projectFilter, setProjectFilter] = useState("all");
  const [sortBy, setSortBy] = useState("created_desc");

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description?.toLowerCase().includes(search.toLowerCase()) ||
      task.projectName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;
    const matchesProject = projectFilter === "all" || task.projectId === projectFilter;
    return matchesSearch && matchesStatus && matchesPriority && matchesProject;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case "created_asc":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case "created_desc":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "due_date_asc":
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      case "due_date_desc":
        return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
      case "priority_desc":
        const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder];
      case "priority_asc":
        const priorityOrderAsc = { urgent: 4, high: 3, medium: 2, low: 1 };
        return priorityOrderAsc[a.priority as keyof typeof priorityOrderAsc] - priorityOrderAsc[b.priority as keyof typeof priorityOrderAsc];
      default:
        return 0;
    }
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
            <p className="text-muted-foreground mt-1">
              Manage and track all your tasks
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/tasks/new">
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold">{tasks.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Done</p>
                  <p className="text-2xl font-bold text-green-600">
                    {tasks.filter((t) => t.status === "done").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {tasks.filter((t) => t.status === "in_progress").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Overdue</p>
                  <p className="text-2xl font-bold text-red-600">
                    {tasks.filter((t) => new Date(t.dueDate) < new Date() && t.status !== "done").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tasks..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Status" />
                    <Filter className="mr-2 h-4 w-4" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Priority" />
                    <Filter className="mr-2 h-4 w-4" />
                  </SelectTrigger>
                  <SelectContent>
                    {priorityOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={projectFilter} onValueChange={setProjectFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Project" />
                    <Filter className="mr-2 h-4 w-4" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Sort" />
                    <TrendingUp className="mr-2 h-4 w-4" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tasks Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Tasks ({sortedTasks.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {sortedTasks.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-medium">No tasks found</h3>
                <p className="mt-2 text-muted-foreground">
                  {search || statusFilter !== "all" || priorityFilter !== "all" || projectFilter !== "all"
                    ? "Try adjusting your filters"
                    : "Get started by creating your first task"}
                </p>
                {(!search && statusFilter === "all" && priorityFilter === "all" && projectFilter === "all") && (
                  <Button asChild className="mt-4">
                    <Link href="/dashboard/tasks/new">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Task
                    </Link>
                  </Button>
                )}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>
                        <Link href={`/dashboard/tasks/${task.id}`} className="font-medium hover:underline">
                          {task.title}
                        </Link>
                        <p className="text-sm text-muted-foreground truncate max-w-xs">
                          {task.description}
                        </p>
                      </TableCell>
                      <TableCell>
                        <Link href={`/dashboard/projects/${task.projectId}`} className="text-sm text-muted-foreground hover:text-foreground">
                          {task.projectName}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadge(task.status)}>
                          {task.status.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getPriorityBadge(task.priority)}>
                          {task.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-xs font-medium text-primary">
                              {getInitials(task.assignee)}
                            </span>
                          </div>
                          <span className="text-sm">{task.assignee}</span>
                        </div>
                      </TableCell>
                      <TableCell className={cn("text-muted-foreground", new Date(task.dueDate) < new Date() && task.status !== "done" && "text-red-500 font-medium")}>
                        {formatDate(task.dueDate)}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}