CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS tb_users_application(
    uuid UUID DEFAULT uuid_generate_v4(),
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,

    PRIMARY KEY  (uuid)
);

INSERT INTO tb_users_application (username, password) VALUES
    ('admin', crypt('admin', gen_salt('bf')));