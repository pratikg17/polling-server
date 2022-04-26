/* Replace with your SQL commands */
DROP TABLE IF EXISTS poll_options;
CREATE TABLE poll_options (
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 option_name TEXT NOT NULL UNIQUE,
 color TEXT NOT NULL UNIQUE,
 poll_id UUID NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now(),
 CONSTRAINT fk_poll_options_polls FOREIGN KEY(poll_id) REFERENCES polls(id)
);
