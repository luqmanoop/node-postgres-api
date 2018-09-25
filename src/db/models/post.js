export default {
  CREATE_TABLE: `CREATE TABLE IF NOT EXISTS posts (
    id serial PRIMARY KEY,
    author_id serial REFERENCES authors(id) ON DELETE CASCADE,
    title VARCHAR (150) NOT NULL,
    slug VARCHAR(150),
    content text,
    createdAt TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP DEFAULT NOW()
)`,
};
