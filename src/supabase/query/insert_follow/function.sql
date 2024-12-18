CREATE OR REPLACE FUNCTION update_follower_followed_info()
RETURNS TRIGGER AS $$
BEGIN
    -- follower_user_id에 대한 정보 추가/갱신
    UPDATE follow
    SET 
        follower_user_name = u_follower.user_name,
        follower_email = u_follower.email,
        follower_avatar_url = u_follower.avatar_url
    FROM user_info u_follower
    WHERE u_follower.id = NEW.follower_user_id
    AND follow.id = NEW.id;

    -- followed_user_id에 대한 정보 추가/갱신
    UPDATE follow
    SET 
        followed_user_name = u_followed.user_name,
        followed_email = u_followed.email,
        followed_avatar_url = u_followed.avatar_url
    FROM user_info u_followed
    WHERE u_followed.id = NEW.followed_user_id
    AND follow.id = NEW.id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
