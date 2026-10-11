# NexaFlow - Modern SaaS Project Management Platform

A production-quality SaaS web application built with Next.js 16, TypeScript, Tailwind CSS, and Supabase. Features project management, task tracking, Kanban boards, team collaboration, and analytics.

## Features

### Landing Page
- Hero section with call-to-action
- Feature highlights with icons
- Interactive dashboard preview
- Pricing plans (Starter, Pro, Enterprise)
- Customer testimonials (sample content)
- FAQ accordion
- Responsive footer with navigation

### Authentication
- User signup with email/password
- User signin with email/password
- Password reset via email
- Protected routes with middleware
- Persistent sessions with Supabase Auth
- Form validation with React Hook Form + Zod

### Dashboard
- Overview metrics (projects, tasks, deadlines)
- Task completion charts (Recharts)
- Project progress visualization
- Recent projects table
- Recent activity feed
- Responsive design

### Project Management
- Create, read, update, delete projects
- Project status (planning, active, on_hold, completed, archived)
- Project priority (low, medium, high, urgent)
- Start dates and due dates
- Progress tracking
- Search, filter, and sort projects
- Project detail view with tabs

### Task Management
- Create, read, update, delete tasks
- Task status (todo, in_progress, done)
- Task priority (low, medium, high)
- Due dates and assignees
- Project association
- Search, filter, and sort tasks
- Task detail view with comments

### Kanban Board
- Three columns: Todo, In Progress, Done
- Drag-and-drop task reordering
- Cross-column task movement
- Task cards with priority, assignee, due date
- Keyboard accessible (Tab, Space, Arrow keys)
- Real-time UI updates

### Team & Activity
- Team member management
- Role-based access (owner, admin, member, viewer)
- Member invitation (UI ready)
- Activity feed with timestamps
- Task assignment tracking

### Settings
- Profile management (name, avatar, workspace)
- Password change
- Notification preferences
- Theme selection (light, dark, system)
- Danger zone (account deletion, sign out everywhere)

## Tech Stack

- **Framework**: Next.js 16.4.0 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **Database & Auth**: Supabase (PostgreSQL)
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Drag & Drop**: @dnd-kit
- **Notifications**: Sonner
- **Utilities**: clsx, tailwind-merge, date-fns

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```
Edit `.env.local` with your Supabase credentials.

4. Set up Supabase:
   - Create a new Supabase project
   - Run the SQL migrations in `supabase/migrations/` in order
   - Enable Email authentication in Supabase Auth settings
   - Configure email templates if desired

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Database Setup

Run the migrations in order:

```sql
-- 1. Initial schema (tables, indexes, triggers)
-- File: supabase/migrations/001_initial_schema.sql

-- 2. Row Level Security policies
-- File: supabase/migrations/002_rls_policies.sql

-- 3. Activity helpers and user triggers
-- File: supabase/migrations/003_activity_helpers.sql
```

### Supabase Configuration

1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy the Project URL and anon/public key
4. Add them to your `.env.local` file

### Authentication Setup

1. In Supabase Dashboard, go to Authentication > Providers
2. Enable Email provider
3. Configure email templates (optional):
   - Confirm signup
   - Reset password
   - Magic link (if using)

## Project Structure

```
portfolio/
├── app/
│   ├── (auth)/           # Authentication pages
│   │   ├── signin/
│   │   ├── signup/
│   │   ├── reset-password/
│   │   └── update-password/
│   ├── (dashboard)/      # Protected dashboard pages
│   │   ├── dashboard/    # Main dashboard
│   │   ├── projects/     # Project management
│   │   ├── tasks/        # Task management
│   │   ├── kanban/       # Kanban board
│   │   ├── team/         # Team management
│   │   └── settings/     # User settings
│   ├── api/              # API routes
│   ├── auth/callback/    # Auth callback handler
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── landing/          # Landing page components
│   └── dashboard/        # Dashboard layout
├── lib/
│   ├── supabase/         # Supabase clients
│   └── utils.ts          # Utility functions
├── types/
│   └── index.ts          # TypeScript types
├── supabase/
│   └── migrations/       # SQL migrations
├── middleware.ts         # Auth middleware
├── .env.example          # Environment template
└── package.json
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `NEXT_PUBLIC_APP_URL` | Application URL | Yes |
| `NEXT_PUBLIC_APP_NAME` | Application name | No |

## Security Features

- Row Level Security (RLS) on all database tables
- Server-side authentication validation
- Protected API routes
- No service role keys in client-side code
- Secure password handling with Supabase Auth
- CSRF protection via SameSite cookies

## Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Color contrast compliance
- Screen reader compatible

## License

MIT License - feel free to use this project for learning or as a starter for your own SaaS.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `npm run lint` and `npm run build`
5. Submit a pull request

## Support

For questions or issues, please open a GitHub issue.