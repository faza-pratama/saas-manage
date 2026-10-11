"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  AlertTriangle,
  MessageSquare,
  Loader2,
  Calendar,
  Users,
  Flag,
} from "lucide-react";
import { cn, formatDate, formatRelativeTime, getInitials } from "@/lib/utils";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const task = {
  id: "1",
  title: "Design homepage",
  description: "Design the new homepage with hero section, features, testimonials, and footer. Use the new design system components and ensure responsive design for all breakpoints.",
  status: "in_progress",
  priority: "high",
  projectId: "1",
  projectName: "Website Redesign",
  assignee: "Sarah Chen",
  assigneeId: "1",
  dueDate: "2024-01-25",
  createdAt: "2024-01-05T09:00:00Z",
  updatedAt: "2024-01-20T14:30:00Z",
};

const comments = [
  { id: "1", user: "Marcus Johnson", content: "Looks great! Just a few tweaks needed on the hero section.", time: "2h ago" },
  { id: "2", user: "Sarah Chen", content: "Thanks! I'll update the hero spacing and button styles.", time: "1h ago" },
  { id: "3", user: "Emily Davis", content: "Can we add the new CTA button variant to the hero?", time: "30m ago" },
];

const activity = [
  { id: "1", user: "Sarah Chen", action: "updated status to", target: "In Progress", time: "2h ago" },
  { id: "2", user: "Marcus Johnson", action: "commented on", target: "this task", time: "2h ago" },
  { id: "3", user: "Sarah Chen", action: "replied to comment", target: "Marcus Johnson", time: "1h ago" },
  { id: "4", user: "Emily Davis", action: "commented on", target: "this task", time: "30m ago" },
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

export default function TaskDetailPage() {
  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedStatus, setEditedStatus] = useState(task.status);
  const [editedPriority, setEditedPriority] = useState(task.priority);
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsEditing(false);
    setIsSaving(false);
  };

  const handleDelete = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    setIsSubmittingComment(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setNewComment("");
    setIsSubmittingComment(false);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/tasks">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1">
            {isEditing ? (
              <Input
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="text-3xl font-bold border-none bg-transparent focus:ring-0"
                disabled={isSaving}
              />
            ) : (
              <h1 className="text-3xl font-bold tracking-tight">{task.title}</h1>
            )}
            <div className="flex items-center gap-3 mt-1">
              <Badge variant={getStatusBadge(task.status)}>
                {task.status.replace("_", " ")}
              </Badge>
              <Badge variant={getPriorityBadge(task.priority)}>
                {task.priority}
              </Badge>
              <Link href={`/dashboard/projects/${task.projectId}`} className="text-sm text-muted-foreground hover:text-foreground">
                {task.projectName}
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave} disabled={isSaving}>
                  {isSaving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Save"
                  )}
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground" size="sm">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Task</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete &ldquo;{task.title}&rdquo;? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            )}
          </div>
        </div>

        {isEditing ? (
          <Card>
            <CardHeader>
              <CardTitle>Edit Task</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-1.5">
                <Label htmlFor="editDescription">Description</Label>
                <Textarea
                  id="editDescription"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  rows={4}
                  disabled={isSaving}
                />
              </div>

              <Separator />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="editStatus">Status</Label>
                  <Select value={editedStatus} onValueChange={setEditedStatus} disabled={isSaving}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todo">Todo</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="editPriority">Priority</Label>
                  <Select value={editedPriority} onValueChange={setEditedPriority} disabled={isSaving}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="editDueDate">Due Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="editDueDate"
                    type="date"
                    value={editedDueDate}
                    onChange={(e) => setEditedDueDate(e.target.value)}
                    disabled={isSaving}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap text-muted-foreground">{task.description}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Comments</CardTitle>
                  <Button variant="ghost" size="icon"><MessageSquare className="h-4 w-4" /></Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-medium text-primary">{getInitials(comment.user)}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{comment.user}</span>
                          <span className="text-xs text-muted-foreground">{comment.time}</span>
                        </div>
                        <p className="mt-1 text-sm">{comment.content}</p>
                      </div>
                    </div>
                  ))}

                  <div className="flex gap-3 pt-4 border-t">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-medium text-primary">Y</span>
                    </div>
                    <div className="flex-1">
                      <Textarea
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        rows={2}
                        className="min-h-[60px]"
                      />
                      <div className="flex justify-end mt-2">
                        <Button size="sm" onClick={handleAddComment} disabled={isSubmittingComment || !newComment.trim()}>
                          {isSubmittingComment ? <Loader2 className="h-4 w-4 animate-spin" /> : "Comment"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Task Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Assignee</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">{getInitials(task.assignee)}</span>
                      </div>
                      <span>{task.assignee}</span>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Due Date</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className={cn(new Date(task.dueDate) < new Date() && task.status !== "done" && "text-red-500 font-medium")}>
                        {formatDate(task.dueDate)}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Created</p>
                    <p className="text-sm text-muted-foreground mt-1">{formatRelativeTime(task.createdAt)}</p>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                    <p className="text-sm text-muted-foreground mt-1">{formatRelativeTime(task.updatedAt)}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {activity.map((item) => (
                      <div key={item.id} className="flex items-start gap-3">
                        <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-medium text-primary">{getInitials(item.user)}</span>
                        </div>
                        <div className="flex-1 min-w-0 text-sm">
                          <p>
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
        )}
      </div>
    </DashboardLayout>
  );
}