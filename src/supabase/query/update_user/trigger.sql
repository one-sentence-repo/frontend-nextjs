CREATE TRIGGER "update_user_info"
AFTER UPDATE ON auth.users
FOR each ROW
EXECUTE FUNCTION public.update_user_profile();