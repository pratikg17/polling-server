
DROP TABLE IF EXISTS polls;
CREATE TABLE polls (
 poll_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 poll_name TEXT NOT NULL,
 poll_desc TEXT NOT NULL,
 user_id UUID NOT NULL,
 is_featured BOOLEAN,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now(),
 CONSTRAINT fk_polls_users FOREIGN KEY(user_id) REFERENCES users(user_id)
);

