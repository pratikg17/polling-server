DROP TABLE IF EXISTS poll_options;
CREATE TABLE poll_options (
 poll_option_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 option_name TEXT NOT NULL ,
 color TEXT NOT NULL,
 poll_id UUID NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now(),
 CONSTRAINT fk_polloptions_polls FOREIGN KEY(poll_id) REFERENCES polls(poll_id) ON DELETE CASCADE
);