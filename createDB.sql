DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS selections;
DROP TABLE IF EXISTS citations;
DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS reset_codes;
-- DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first VARCHAR(255) NOT NULL CHECK (first <> ''),
  last VARCHAR(255) NOT NULL CHECK (last <> ''),
  email VARCHAR(255) NOT NULL UNIQUE CHECK (email <> ''),
  image_url VARCHAR,
  biography VARCHAR,
  hashpass VARCHAR(255) NOT NULL CHECK (hashpass <> ''),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reset_codes(
  id SERIAL PRIMARY KEY,
  email VARCHAR NOT NULL,
  code VARCHAR NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE friendships(
  id SERIAL PRIMARY KEY,
  sender_id INTEGER NOT NULL REFERENCES users(id),
  recipient_id INTEGER NOT NULL REFERENCES users(id),
  accepted BOOLEAN NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE citations(
  id SERIAL PRIMARY KEY,
  citation VARCHAR NOT NULL,
  author VARCHAR,
  source VARCHAR,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id INTEGER NOT NULL REFERENCES users(id)
);

CREATE TABLE selections(
  id SERIAL PRIMARY KEY,
  selection VARCHAR NOT NULL,
  citation_id INTEGER NOT NULL REFERENCES citations(id),
  user_id INTEGER NOT NULL REFERENCES users(id)
);

CREATE TABLE comments(
  id SERIAL PRIMARY KEY,
  sender_id INTEGER NOT NULL REFERENCES users(id),
  --group_id INTEGER NOT NULL REFERENCES group(id), --pending implementation
  comment VARCHAR(500) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INSERT INTO messages (sender_id, message) VALUES(1,'Hello everyone in the World, first message!');
-- INSERT INTO messages (sender_id, message) VALUES(2,'Lets start a conversation');
-- INSERT INTO messages (sender_id, message) VALUES(3,'ok'); 