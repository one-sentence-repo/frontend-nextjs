CREATE OR REPLACE FUNCTION insert_into_garden()
RETURNS TRIGGER AS $$
DECLARE
    v_year_month TEXT := to_char(new.created_at, 'YYYY.MM');
    v_user_id TEXT := new.user_id::text; -- Add user_id variable
    v_json_obj JSONB;
BEGIN
    v_json_obj := jsonb_build_object(
        'content', new.content,
        'created_at', new.created_at,
        'id', new.id::text,
        'emotion_level', new.emotion_level,
        'tags', new.tags,
        'favorite', new.favorite,
        'favorited_user_id', new.favorited_user_id,
        'comment', new.comment
    );

    IF EXISTS (SELECT 1 FROM garden WHERE year_month = v_year_month AND user_id = v_user_id) THEN
        UPDATE garden
        SET posts = posts || v_json_obj
        WHERE year_month = v_year_month AND user_id = v_user_id;
    ELSE
        INSERT INTO garden (year_month, user_id, posts)
        VALUES (v_year_month, v_user_id, ARRAY[v_json_obj]::jsonb[]);
    END IF;
    RETURN new;
END;
$$ LANGUAGE plpgsql;
