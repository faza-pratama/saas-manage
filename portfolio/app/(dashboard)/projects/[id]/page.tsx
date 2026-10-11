"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Plus,
  CheckCircle,
  Clock,
  AlertTriangle,
  FolderKanban,
  Users,
  Activity,
} from "lucide-react";
import { cn, formatDate, formatRelativeTime, getInitials } from "@/lib/utils";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const project = {
  id: "1",
  name: "Website Redesign",
  description: "Complete redesign of the company website with new branding, improved UX, and modern tech stack.",
  status: "active",
  priority: "high",
  startDate: "2024-01-01",
  dueDate: "2024-02-15",
  progress: 65,
  tasks: { done: 13, total: 20 },
  createdAt: "2024-01-01T10:00:00Z",
  updatedAt: "2024-01-20T14:30:00Z",
  members: [
    { id: "1", name: "Sarah Chen", role: "Lead Designer", avatar: "SC" },
    { id: "2", name: "Marcus Johnson", role: "Frontend Developer", avatar: "MJ" },
    { id: "3", name: "Emily Davis", role: "Project Manager", avatar: "ED" },
  ],
};

const tasks = [
  { id: "1", title: "Design system audit", status: "done", priority: "high", assignee: "Sarah Chen", dueDate: "2024-01-15" },
  { id: "2", title: "Create wireframes", status: "done", priority: "high", assignee: "Sarah Chen", dueDate: "2024-01-20" },
  { id: "3", title: "Design homepage", status: "done", priority: "high", assignee: "Sarah Chen", dueDate: "2024-01-25" },
  { id: "4", title: "Design product pages", status: "in_progress", priority: "medium", assignee: "Marcus Johnson", dueDate: "2024-02-01" },
  { id: "5", title: "Implement header component", status: "in_progress", priority: "high", assignee: "Marcus Johnson", dueDate: "2024-02-05" },
  { id: "6", title: "Implement footer component", status: "todo", priority: "medium", assignee: "Marcus Johnson", dueDate: "2024-02-10" },
  { id: "7", title: "Responsive testing", status: "todo", priority: "high", assignee: "Marcus Johnson", dueDate: "2024-02-12" },
  { id: "8", title: "Accessibility audit", status: "todo", priority: "medium", assignee: "Emily Davis", dueDate: "2024-02-14" },
];

const activity = [
  { id: "1", user: "Sarah Chen", action: "completed task", target: "Design homepage", time: "2h ago" },
  { id: "2", user: "Marcus Johnson", action: "started task", target: "Implement header component", time: "4h ago" },
  { id: "3", user: "Emily Davis", action: "updated project", target: "Changed due date to Feb 15", time: "1d ago" },
  { id: "4", user: "You", action: "added member", target: "Marcus Johnson", time: "3d ago" },
];

function getStatusBadge(status: string) {
  const variants: Record<string, "success" | "info" | "warning" | "secondary" | "default"> = {
    active: "success",
    planning: "info",
    on_hold: "warning",
    completed: "default",
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

function getTaskStatusBadge(status: string) {
  const variants: Record<string, "success" | "default" | "secondary"> = {
    done: "success",
    in_progress: "default",
    todo: "secondary",
  };
  return variants[status] || "secondary";
}

export default function ProjectDetailPage() {
  const params = useParams();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDelete = () => {
    // Simulate delete
    setIsDeleteDialogOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/projects">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
              <Badge variant={getStatusBadge(project.status)}>
                {project.status.replace("_", " ")}
              </Badge>
              <Badge variant={getPriorityBadge(project.priority)}>
                {project.priority}
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1">{project.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href={`/dashboard/projects/${params.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Project</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete &ldquo;{project.name}&rdquo;? This action cannot be undone and will delete all associated tasks.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Project Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FolderKanban className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Progress</p>
                  <p className="text-2xl font-bold">{project.progress}%</p>
                </div>
              </div>
              <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${project.progress}%` }} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tasks Done</p>
                  <p className="text-2xl font-bold">{project.tasks.done}/{project.tasks.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Due Date</p>
                  <p className="text-2xl font-bold">{formatDate(project.dueDate)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Team Members</p>
                  <p className="text-2xl font-bold">{project.members.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="tasks" className="space-y-4">
          <TabsList>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks">
            <div className="flex items-center justify-between mb-4">
              <CardTitle>Project Tasks</CardTitle>
              <Button asChild size="sm">
                <Link href={`/dashboard/tasks?project=${project.id}`}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Task
                </Link>
              </Button>
            </div>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Assignee</TableHead>
                      <TableHead>Due Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell className="font-medium">
                          <Link href={`/dashboard/tasks/${task.id}`}>{task.title}</Link>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getTaskStatusBadge(task.status)}>
                            {task.status.replace("_", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getPriorityBadge(task.priority)}>{task.priority}</Badge>
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
                        <TableCell className="text-muted-foreground">{formatDate(task.dueDate)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Team Members</CardTitle>
                <Button variant="outline" size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Member
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">{member.avatar}</span>
                        </div>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">Edit</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activity.map((item) => (
                    <div key={item.id} className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-medium text-primary">
                          {getInitials(item.user)}
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
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}