CREATE FUNCTION update_user_profile()
RETURN trigger
LANGUAGE plpgsql
SECURITY definer SET search_path = public
AS $$
BEGIN
    UPDATE public.user_info
    SET user_name = new.raw_user_meta_data ->> 'user_name',
        avatar_url = new.raw_user_meta_data ->> 'avatar_url',
        about_me = new.raw_user_meta_data ->> 'about_me'
    WHERE id = new.id;
    RETURN new;
END;
$$;