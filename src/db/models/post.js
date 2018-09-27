export default {
  CREATE_TABLE: `CREATE TABLE IF NOT EXISTS posts (
    id serial PRIMARY KEY,
    author_id serial REFERENCES authors(id) ON DELETE CASCADE,
    title VARCHAR (150) NOT NULL,
    content text,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
)`,
};
