CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,
    username varchar(100) NOT NULL UNIQUE,
    password varchar(255) NOT NULL
    );

CREATE TABLE IF NOT EXISTS role (
    id SERIAL PRIMARY KEY,
    name varchar(100) NOT NULL UNIQUE
    );

CREATE TABLE IF NOT EXISTS user_role (
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES Role(id) ON DELETE CASCADE
    );

CREATE TABLE IF NOT EXISTS run (
    id SERIAL PRIMARY KEY,
    title varchar(250) NOT NULL,
    started_on timestamp NOT NULL,
    completed_on timestamp NOT NULL,
    miles DOUBLE PRECISION NOT NULL,
    location varchar(10) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE
    );