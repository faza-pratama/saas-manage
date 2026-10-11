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
import { Plus, Search, Filter, MoreHorizontal, TrendingUp, FolderKanban } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "planning", label: "Planning" },
  { value: "active", label: "Active" },
  { value: "on_hold", label: "On Hold" },
  { value: "completed", label: "Completed" },
  { value: "archived", label: "Archived" },
];

const priorityOptions = [
  { value: "all", label: "All Priorities" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" },
];

const sortOptions = [
  { value: "created_desc", label: "Newest First" },
  { value: "created_asc", label: "Oldest First" },
  { value: "name_asc", label: "Name A-Z" },
  { value: "name_desc", label: "Name Z-A" },
  { value: "due_date_asc", label: "Due Date (Soonest)" },
  { value: "due_date_desc", label: "Due Date (Latest)" },
];

const projects = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Complete redesign of the company website with new branding",
    status: "active",
    priority: "high",
    startDate: "2024-01-01",
    dueDate: "2024-02-15",
    progress: 65,
    tasks: { done: 13, total: 20 },
    createdAt: "2024-01-01T10:00:00Z",
  },
  {
    id: "2",
    name: "Mobile App v2.0",
    description: "Major update to the mobile application with new features",
    status: "planning",
    priority: "medium",
    startDate: "2024-02-01",
    dueDate: "2024-03-01",
    progress: 15,
    tasks: { done: 3, total: 20 },
    createdAt: "2024-01-15T14:30:00Z",
  },
  {
    id: "3",
    name: "API Integration",
    description: "Integration with third-party payment and shipping APIs",
    status: "active",
    priority: "urgent",
    startDate: "2024-01-10",
    dueDate: "2024-01-30",
    progress: 80,
    tasks: { done: 16, total: 20 },
    createdAt: "2024-01-10T09:00:00Z",
  },
  {
    id: "4",
    name: "Design System",
    description: "Create a comprehensive design system for all products",
    status: "on_hold",
    priority: "low",
    startDate: "2024-01-20",
    dueDate: "2024-02-28",
    progress: 40,
    tasks: { done: 8, total: 20 },
    createdAt: "2024-01-20T11:00:00Z",
  },
  {
    id: "5",
    name: "Q1 Marketing Campaign",
    description: "Launch marketing campaign for Q1 product releases",
    status: "planning",
    priority: "high",
    startDate: "2024-02-01",
    dueDate: "2024-02-28",
    progress: 5,
    tasks: { done: 1, total: 15 },
    createdAt: "2024-01-25T16:00:00Z",
  },
];

function getStatusBadge(status: string) {
  const variants: Record<string, "success" | "info" | "warning" | "secondary"> = {
    active: "success",
    planning: "info",
    on_hold: "warning",
    completed: "secondary",
    archived: "secondary",
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

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("created_desc");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(search.toLowerCase()) ||
      project.description?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || project.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case "created_asc":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case "created_desc":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "name_asc":
        return a.name.localeCompare(b.name);
      case "name_desc":
        return b.name.localeCompare(a.name);
      case "due_date_asc":
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      case "due_date_desc":
        return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
      default:
        return 0;
    }
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            <p className="text-muted-foreground mt-1">
              Manage and track all your projects
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/projects/new">
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
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
                  <SelectTrigger className="w-[180px]">
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
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
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

        {/* Projects Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Projects ({sortedProjects.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {sortedProjects.length === 0 ? (
              <div className="text-center py-12">
                <FolderKanban className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-medium">No projects found</h3>
                <p className="mt-2 text-muted-foreground">
                  {search || statusFilter !== "all" || priorityFilter !== "all"
                    ? "Try adjusting your filters"
                    : "Get started by creating your first project"}
                </p>
                {(!search && statusFilter === "all" && priorityFilter === "all") && (
                  <Button asChild className="mt-4">
                    <Link href="/dashboard/projects/new">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Project
                    </Link>
                  </Button>
                )}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="text-right">Tasks</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedProjects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell>
                        <Link href={`/dashboard/projects/${project.id}`} className="font-medium hover:underline">
                          {project.name}
                        </Link>
                        <p className="text-sm text-muted-foreground truncate max-w-xs">
                          {project.description}
                        </p>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadge(project.status)}>
                          {project.status.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getPriorityBadge(project.priority)}>
                          {project.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="h-2 w-32 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(project.dueDate)}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {project.tasks.done}/{project.tasks.total}
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