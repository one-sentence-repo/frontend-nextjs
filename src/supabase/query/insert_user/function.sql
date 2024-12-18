CREATE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY definer SET search_path = public
AS $$

BEGIN
  INSERT INTO public.user_info(id, user_name, email, avatar_url, about_me)
  VALUES (new.id, new.raw_user_meta_data ->> 'user_name', new.email, new.raw_user_meta_data -> 'avatar_url', new.raw_user_meta_data ->> 'about_me');
  RETURN new;
END;
$$;

