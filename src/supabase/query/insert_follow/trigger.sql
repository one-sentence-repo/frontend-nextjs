CREATE TRIGGER update_follow_info_trigger
AFTER INSERT OR UPDATE ON follow
FOR EACH ROW
EXECUTE FUNCTION update_follower_followed_info();