-- Helper function to log activities
CREATE OR REPLACE FUNCTION log_activity(
  p_workspace_id UUID,
  p_user_id UUID,
  p_action TEXT,
  p_entity_type TEXT,
  p_entity_id UUID,
  p_metadata JSONB DEFAULT NULL
) RETURNS VOID AS $$
BEGIN
  INSERT INTO activities (workspace_id, user_id, action, entity_type, entity_id, metadata)
  VALUES (p_workspace_id, p_user_id, p_action, p_entity_type, p_entity_id, p_metadata);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger function for project activities
CREATE OR REPLACE FUNCTION trigger_project_activity()
RETURNS TRIGGER AS $$
DECLARE
  v_action TEXT;
  v_metadata JSONB;
BEGIN
  IF TG_OP = 'INSERT' THEN
    v_action := 'created';
    v_metadata := jsonb_build_object('name', NEW.name, 'status', NEW.status);
  ELSIF TG_OP = 'UPDATE' THEN
    v_action := 'updated';
    v_metadata := jsonb_build_object(
      'name', NEW.name,
      'old_status', OLD.status,
      'new_status', NEW.status,
      'old_priority', OLD.priority,
      'new_priority', NEW.priority
    );
  ELSIF TG_OP = 'DELETE' THEN
    v_action := 'deleted';
    v_metadata := jsonb_build_object('name', OLD.name);
  END IF;

  PERFORM log_activity(
    NEW.workspace_id,
    NEW.created_by,
    v_action,
    'project',
    NEW.id,
    v_metadata
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger function for task activities
CREATE OR REPLACE FUNCTION trigger_task_activity()
RETURNS TRIGGER AS $$
DECLARE
  v_action TEXT;
  v_metadata JSONB;
BEGIN
  IF TG_OP = 'INSERT' THEN
    v_action := 'created';
    v_metadata := jsonb_build_object('title', NEW.title, 'status', NEW.status, 'priority', NEW.priority);
  ELSIF TG_OP = 'UPDATE' THEN
    v_action := 'updated';
    v_metadata := jsonb_build_object(
      'title', NEW.title,
      'old_status', OLD.status,
      'new_status', NEW.status,
      'old_priority', OLD.priority,
      'new_priority', NEW.priority
    );
  ELSIF TG_OP = 'DELETE' THEN
    v_action := 'deleted';
    v_metadata := jsonb_build_object('title', OLD.title);
  END IF;

  PERFORM log_activity(
    NEW.workspace_id,
    NEW.created_by,
    v_action,
    'task',
    NEW.id,
    v_metadata
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
DROP TRIGGER IF EXISTS project_activity_trigger ON projects;
CREATE TRIGGER project_activity_trigger
  AFTER INSERT OR UPDATE OR DELETE ON projects
  FOR EACH ROW EXECUTE FUNCTION trigger_project_activity();

DROP TRIGGER IF EXISTS task_activity_trigger ON tasks;
CREATE TRIGGER task_activity_trigger
  AFTER INSERT OR UPDATE OR DELETE ON tasks
  FOR EACH ROW EXECUTE FUNCTION trigger_task_activity();

-- Function to get user's workspace
CREATE OR REPLACE FUNCTION get_user_workspace(p_user_id UUID DEFAULT auth.uid())
RETURNS TABLE (workspace_id UUID, role TEXT) AS $$
BEGIN
  RETURN QUERY
  SELECT wm.workspace_id, wm.role
  FROM workspace_members wm
  WHERE wm.user_id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create a default workspace for new users
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  v_workspace_id UUID;
  v_slug TEXT;
BEGIN
  -- Create profile
  INSERT INTO profiles (id, email, full_name, avatar_url)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url')
  ON CONFLICT (id) DO NOTHING;

  -- Create default workspace
  v_slug := lower(regexp_replace(NEW.email, '[^a-z0-9]+', '-', 'g')) || '-' || substr(NEW.id::text, 1, 8);
  INSERT INTO workspaces (name, slug, owner_id)
  VALUES (COALESCE(NEW.raw_user_meta_data->>'full_name', 'My Workspace') || "'s Workspace", v_slug, NEW.id)
  RETURNING id INTO v_workspace_id;

  -- Add user as owner of workspace
  INSERT INTO workspace_members (workspace_id, user_id, role)
  VALUES (v_workspace_id, NEW.id, 'owner');

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();