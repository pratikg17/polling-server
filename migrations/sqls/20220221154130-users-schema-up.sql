DROP TABLE IF EXISTS users;
CREATE TABLE users (
 user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 username TEXT NOT NULL UNIQUE,
 first_name TEXT NOT NULL,
 last_name TEXT NOT NULL,
 email TEXT NOT NULL UNIQUE,
 password TEXT NOT NULL,
 role_id UUID NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now(),
 CONSTRAINT fk_users FOREIGN KEY(role_id) REFERENCES roles(role_id)
);
