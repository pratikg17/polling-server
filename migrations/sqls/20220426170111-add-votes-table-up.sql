DROP TABLE IF EXISTS votes;
CREATE TABLE votes (
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 poll_option_id UUID NOT NULL,
 poll_id UUID NOT NULL,
 user_id UUID NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now(),
 CONSTRAINT fk_users_votes FOREIGN KEY(user_id) REFERENCES users(user_id),
 CONSTRAINT fk_polls_votes FOREIGN KEY(poll_option_id) REFERENCES polls(poll_id),
 CONSTRAINT fk_poll_options_votes FOREIGN KEY(poll_option_id) REFERENCES poll_options(poll_option_id)
);
