# Introduction

A simple blog API built using NodeJS + Express + Postgres.

## Installation

```bash
$ git clone git@github.com:codeshifu/node-postgres-api.git

$ cd node-postgres-api

$ npm install
```

### Rename _.env.sample_ to .env and set database connection

```
DB_URL=postgres://user:password@host:port/database
```

## Run

```bash
$ npm run dev
```

Visit http://localhost:8000/api/v1

### Available endpoints

`/api/v1/authors`

| method | route              | description          |
| ------ | ------------------ | -------------------- |
| GET    | /authors           | Get authors          |
| POST   | /authors           | Create author        |
| GET    | /authors/:id       | Get author by ID     |
| GET    | /authors/:id/posts | Get posts by author  |
| PUT    | /authors/:id       | Update author        |
| DELETE | /authors/:id       | Delete/remove author |

`/api/v1/posts`

| method | route      | description          |
| ------ | ---------- | -------------------- |
| GET    | /posts     | Get posts            |
| POST   | /posts     | Create post          |
| GET    | /posts/:id | Get posts by ID      |
| PUT    | /posts/:id | Update author        |
| DELETE | /posts/:id | Delete/remove author |
