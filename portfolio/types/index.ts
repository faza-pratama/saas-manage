export type UserRole = "owner" | "admin" | "member" | "viewer";

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  avatar_url: string | null;
  owner_id: string;
  created_at: string;
  updated_at: string;
}

export interface WorkspaceMember {
  id: string;
  workspace_id: string;
  user_id: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
  profile?: Profile;
}

export interface Project {
  id: string;
  workspace_id: string;
  name: string;
  description: string | null;
  status: ProjectStatus;
  priority: ProjectPriority;
  start_date: string | null;
  due_date: string | null;
  progress: number;
  created_by: string;
  created_at: string;
  updated_at: string;
  tasks?: Task[];
  task_count?: number;
  completed_tasks?: number;
}

export type ProjectStatus = "planning" | "active" | "on_hold" | "completed" | "archived";
export type ProjectPriority = "low" | "medium" | "high" | "urgent";

export interface Task {
  id: string;
  project_id: string;
  workspace_id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  due_date: string | null;
  assignee_id: string | null;
  created_by: string;
  position: number;
  created_at: string;
  updated_at: string;
  assignee?: Profile;
  project?: Project;
}

export type TaskStatus = "todo" | "in_progress" | "done";
export type TaskPriority = "low" | "medium" | "high";

export interface Activity {
  id: string;
  workspace_id: string;
  user_id: string;
  action: string;
  entity_type: "project" | "task" | "workspace" | "member";
  entity_id: string;
  metadata: Record<string, unknown> | null;
  created_at: string;
  user?: Profile;
}

export interface DashboardMetrics {
  totalProjects: number;
  tasksCompleted: number;
  tasksInProgress: number;
  upcomingDeadlines: number;
  recentActivity: Activity[];
  taskCompletionData: ChartDataPoint[];
  projectProgressData: ChartDataPoint[];
  recentProjects: Project[];
}

export interface ChartDataPoint {
  name: string;
  value: number;
  date?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}