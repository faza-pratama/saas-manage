"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Plus, GripVertical, Calendar, Users, Flag, MoreHorizontal } from "lucide-react";
import { cn, formatDate, getInitials } from "@/lib/utils";
import { toast } from "sonner";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "in_progress" | "done";
  priority: "low" | "medium" | "high";
  assignee?: string;
  dueDate?: string;
}

const columns = [
  { id: "todo", title: "Todo", color: "bg-gray-500" },
  { id: "in_progress", title: "In Progress", color: "bg-blue-500" },
  { id: "done", title: "Done", color: "bg-green-500" },
];

const initialTasks: Record<string, Task[]> = {
  todo: [
    { id: "1", title: "Design system audit", status: "todo", priority: "high", assignee: "Sarah Chen", dueDate: "2024-01-15" },
    { id: "2", title: "Create wireframes", status: "todo", priority: "high", assignee: "Sarah Chen", dueDate: "2024-01-20" },
    { id: "3", title: "Research competitors", status: "todo", priority: "medium", assignee: "Emily Davis", dueDate: "2024-01-25" },
    { id: "4", title: "Define color palette", status: "todo", priority: "low", assignee: "Sarah Chen", dueDate: "2024-01-30" },
  ],
  in_progress: [
    { id: "5", title: "Design homepage", status: "in_progress", priority: "high", assignee: "Sarah Chen", dueDate: "2024-02-01" },
    { id: "6", title: "Implement header component", status: "in_progress", priority: "high", assignee: "Marcus Johnson", dueDate: "2024-02-05" },
    { id: "7", title: "Build footer component", status: "in_progress", priority: "medium", assignee: "Marcus Johnson", dueDate: "2024-02-10" },
  ],
  done: [
    { id: "8", title: "Project kickoff meeting", status: "done", priority: "high", assignee: "Emily Davis", dueDate: "2024-01-10" },
    { id: "9", title: "Set up design system repo", status: "done", priority: "medium", assignee: "Marcus Johnson", dueDate: "2024-01-12" },
    { id: "10", title: "Configure CI/CD pipeline", status: "done", priority: "high", assignee: "Marcus Johnson", dueDate: "2024-01-15" },
  ],
};

function getPriorityBadge(priority: string) {
  const variants: Record<string, "destructive" | "warning" | "info" | "secondary"> = {
    high: "destructive",
    medium: "warning",
    low: "info",
  };
  return variants[priority] || "secondary";
}

interface SortableTaskCardProps {
  task: Task;
}

function SortableTaskCard({ task }: SortableTaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "bg-white rounded-lg border p-4 shadow-sm transition-shadow hover:shadow-md",
        isDragging && "shadow-lg rotate-1"
      )}
    >
      <div className="flex items-start gap-3">
        <button
          {...attributes}
          {...listeners}
          className="mt-1 h-6 w-6 rounded bg-muted flex items-center justify-center cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
          aria-label="Drag to reorder"
        >
          <GripVertical className="h-4 w-4" />
        </button>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium truncate">{task.title}</h4>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <Badge variant={getPriorityBadge(task.priority)} className="text-xs">
              {task.priority}
            </Badge>
            {task.assignee && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Users className="h-3 w-3" />
                <span>{task.assignee}</span>
              </div>
            )}
            {task.dueDate && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(task.dueDate)}</span>
              </div>
            )}
          </div>
        </div>
        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function KanbanColumn({ columnId, title, color, tasks }: { columnId: string; title: string; color: string; tasks: Task[] }) {
  return (
    <div className="flex flex-col min-w-[300px] max-w-[300px] flex-shrink-0">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`h-3 w-3 rounded-full ${color}`} />
          <h3 className="font-semibold">{title}</h3>
          <Badge variant="secondary" className="text-xs">{tasks.length}</Badge>
        </div>
      </div>
      <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <div
          className="space-y-3 min-h-[200px] rounded-lg p-2 bg-muted/30"
          role="list"
          aria-label={`${title} tasks`}
        >
          {tasks.map((task) => (
            <SortableTaskCard key={task.id} task={task} />
          ))}
          {tasks.length === 0 && (
            <div className="h-20 flex items-center justify-center text-muted-foreground/50 text-sm">
              Drop tasks here
            </div>
          )}
        </div>
      </SortableContext>
      <Button variant="outline" size="sm" className="w-full mt-2" asChild>
        <a href="/dashboard/tasks/new">
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </a>
      </Button>
    </div>
  );
}

export default function KanbanPage() {
  const [tasks, setTasks] = useState<Record<string, Task[]>>(initialTasks);
  const [projectFilter, setProjectFilter] = useState("all");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const activeId = active.id as string;
      const overId = over.id as string;

      // Find source and destination columns
      let sourceColumn: string | null = null;
      let destColumn: string | null = null;

      for (const [colId, colTasks] of Object.entries(tasks)) {
        if (colTasks.some((t) => t.id === activeId)) sourceColumn = colId;
        if (colTasks.some((t) => t.id === overId)) destColumn = colId;
      }

      if (sourceColumn && destColumn) {
        setTasks((prev) => {
          const newTasks = { ...prev };
          const sourceTasks = [...newTasks[sourceColumn!]];
          const destTasks = [...newTasks[destColumn!]];

          const activeIndex = sourceTasks.findIndex((t) => t.id === activeId);
          const overIndex = destTasks.findIndex((t) => t.id === overId);

          if (sourceColumn === destColumn) {
            // Same column - reorder
            const [removed] = sourceTasks.splice(activeIndex, 1);
            sourceTasks.splice(overIndex, 0, removed);
            newTasks[sourceColumn] = sourceTasks;
          } else {
            // Different columns - move
            const [removed] = sourceTasks.splice(activeIndex, 1);
            removed.status = destColumn as Task["status"];
            destTasks.splice(overIndex, 0, removed);
            newTasks[sourceColumn] = sourceTasks;
            newTasks[destColumn] = destTasks;
          }

          return newTasks;
        });
      }
    }
  };

  const totalTasks = Object.values(tasks).reduce((sum, col) => sum + col.length, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Kanban Board</h1>
            <p className="text-muted-foreground mt-1">
              Visualize and manage your workflow
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={projectFilter} onValueChange={setProjectFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="All Projects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                <SelectItem value="1">Website Redesign</SelectItem>
                <SelectItem value="2">Mobile App v2.0</SelectItem>
                <SelectItem value="3">API Integration</SelectItem>
                <SelectItem value="4">Design System</SelectItem>
                <SelectItem value="5">Q1 Marketing Campaign</SelectItem>
              </SelectContent>
            </Select>
            <Button asChild>
              <a href="/dashboard/tasks/new">
                <Plus className="mr-2 h-4 w-4" />
                New Task
              </a>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm font-medium text-muted-foreground">Todo</p>
              <p className="text-2xl font-bold">{tasks.todo.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm font-medium text-muted-foreground">In Progress</p>
              <p className="text-2xl font-bold">{tasks.in_progress.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm font-medium text-muted-foreground">Done</p>
              <p className="text-2xl font-bold">{tasks.done.length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Kanban Board */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
            {columns.map((column) => (
              <KanbanColumn
                key={column.id}
                columnId={column.id}
                title={column.title}
                color={column.color}
                tasks={tasks[column.id] || []}
              />
            ))}
          </div>
        </DndContext>

        {/* Keyboard shortcuts hint */}
        <div className="text-center text-sm text-muted-foreground">
          <kbd className="px-2 py-1 bg-muted rounded">Tab</kbd> to navigate,
          <kbd className="px-2 py-1 bg-muted rounded">Space</kbd> to pick up,
          <kbd className="px-2 py-1 bg-muted rounded">Arrow Keys</kbd> to move,
          <kbd className="px-2 py-1 bg-muted rounded">Space</kbd> to drop
        </div>
      </div>
    </DashboardLayout>
  );
}