CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS tb_users_application(
    uuid UUID DEFAULT uuid_generate_v4(),
    email VARCHAR NOT NULL UNIQUE,
    username VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL,

    PRIMARY KEY  (uuid)
);

INSERT INTO tb_users_application (username, email ,password) VALUES
    ('admin', 'admin@admin.com' , crypt('admin', gen_salt('bf')));