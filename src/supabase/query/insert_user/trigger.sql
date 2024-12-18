CREATE TRIGGER "add_new_user"
AFTER INSERT ON auth.users
FOR each ROW
EXECUTE FUNCTION public.handle_new_user();