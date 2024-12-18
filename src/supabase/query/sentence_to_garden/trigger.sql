CREATE TRIGGER after_insert_on_post
AFTER INSERT ON post
FOR each ROW
EXECUTE FUNCTION insert_into_garden();
