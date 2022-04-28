DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS reset_codes;

CREATE TABLE users (
        id SERIAL primary key,
        first VARCHAR(255) NOT NULL CHECK (first <> ''),
        last VARCHAR(255) NOT NULL CHECK (last <> ''),
        email VARCHAR(255) NOT NULL UNIQUE CHECK (email <> ''),
        hashpass VARCHAR(255) NOT NULL CHECK (hashpass <> ''),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reset_codes(
  id SERIAL PRIMARY KEY,
  email VARCHAR NOT NULL,
  code VARCHAR NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);