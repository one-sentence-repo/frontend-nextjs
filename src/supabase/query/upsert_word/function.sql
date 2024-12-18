CREATE OR REPLACE FUNCTION update_word_dictionary_and_user_words()
RETURNS TRIGGER AS $$
DECLARE
    words TEXT[];
    word_item TEXT;
    user_uuid UUID;
    current_word JSONB;
    word_found BOOLEAN;
BEGIN
    words := regexp_split_to_array(NEW.content, '\s+');
    user_uuid := NEW.user_id;

    FOREACH word_item IN ARRAY words LOOP
        IF EXISTS (SELECT 1 FROM word_dictionary WHERE word_dictionary.word = word_item) THEN
            UPDATE word_dictionary
            SET count = count + 1
            WHERE word_dictionary.word = word_item;
        ELSE
            INSERT INTO word_dictionary (word, count)
            VALUES (word_item, 1);
        END IF;

        word_found := FALSE;

        IF EXISTS (SELECT 1 FROM user_words WHERE user_words.user_id = user_uuid) THEN
            FOR current_word IN
                SELECT unnest(user_words.words)
                FROM user_words
                WHERE user_words.user_id = user_uuid
            LOOP
                IF current_word->>'word' = word_item THEN
                    UPDATE user_words
                    SET words = array_replace(
                        user_words.words,
                        current_word,
                        jsonb_build_object('word', word_item, 'count', (current_word->>'count')::INT + 1)
                    )
                    WHERE user_words.user_id = user_uuid;

                    word_found := TRUE;
                    EXIT;
                END IF;
            END LOOP;

            IF NOT word_found THEN
                UPDATE user_words
                SET words = array_append(user_words.words, jsonb_build_object('word', word_item, 'count', 1))
                WHERE user_words.user_id = user_uuid;
            END IF;
        ELSE
            INSERT INTO user_words (user_id, words)
            VALUES (user_uuid, ARRAY[jsonb_build_object('word', word_item, 'count', 1)]::jsonb[]);
        END IF;
    END LOOP;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
