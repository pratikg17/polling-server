INSERT INTO users
(user_id, username, first_name, last_name, email, "password", role_id, created_at, updated_at)
VALUES(gen_random_uuid(),'admin', 'admin', 'admin', 'admin@admin.com', 'admin123', (select role_id  from roles where "name" = 'admin'), now(), now());

