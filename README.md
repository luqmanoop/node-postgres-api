## Prerequisite

- [NodeJS](https://nodejs.org)
- [ElephantSQL](https://customer.elephantsql.com/login) free account

# Step 1 - Setting up the Project

- Create app
- Initialize app
- Install/Setup development tools
- Configure npm scripts
- Run app

### Creating the Application

Launch your terminal and create a new folder for the application

```bash
$ mkdir postgres-blog-api
```

### Initialize the application with a package.json file

Go to the root folder and initialize the app with a `package.json` file (accepting all defaults)

```bash
cd postgres-blog-api
npm init -y
```

### Installing development tools

We'll be writing ES6 so we need to install Babel for transpiling and some other dev dependencies to make our development experience seamless.

```bash
$ npm install babel-cli babel-preset-env babel-plugin-transform-runtime nodemon npm-run-all rimraf --save-dev
```

Create a `.babelrc` in your project root folder and add

```json
{
  "presets": "env"
}
```

### Configure npm scripts

Let's setup some really awesome and life-saver npm scripts in `package.json`. We want to able to run our server once and whenever we add a new file or make some changes and hit save, the server automatically restarts picking up our latest changes. 😱

```json
{
  "scripts": {
    "build": "babel src -d dist",
    "clean": "rimraf dist",
    "dev:build": "npm-run-all --parallel clean start",
    "dev": "nodemon --watch src --exec npm run dev:build",
    "start": "npm run build && node dist/server.js"
  }
}
```

### Run app

```bash
$ npm run dev
```

```
postgres-blog-api
    |
    └── node_modules/
    |
    └── src
        |
        └── controllers/
        |
        └── router/
        |
        └── db
        |   |
        |   └── models/
        server.js

    └── package.json
```

# Step 2 - Express

- Install server dependencies
- Create/Configure server
- Create routers
- Version API
- Register routers

The above command will throw some errors because we haven't created our `server.js` file yet. We'll be doing that next.

## 2.1 Install dependencies

To get started building the API we'll install

- express - for web server
- cors - (Middleware) for [cross-origin resource sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- body-parser - (Middleware) for parsing incoming request body

```bash
$ npm install express cors body-parser
```

## 2.2 Create and configure server

Now that we've installed express, let's create our server file. We'll create a _server.js_ file inside the _src/_ directory and add the following

`src/server.js`

```javascript
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
```

## 2.3 Creating the routers

Two routers are needed for this API, _author_ & _post_ routers. We'll put our routers inside `router/` directory. For now theses routers won't do anything fun, when they are visited they just return the boring word _TODO_. We'll revisit them when we create our controllers.

Route for handling requests to `/authors` endpoint
`src/router/author.js`

```javascript
import express from 'express';

const router = express.Router();

router
  .route('/authors')
  .get((req, res) => res.send('TODO'))
  .post((req, res) => res.send('TODO'));

router
  .route('/authors/:id')
  .get((req, res) => res.send('TODO'))
  .put((req, res) => res.send('TODO'))
  .delete((req, res) => res.send('TODO'));

router.route('/authors/:id/posts').get((req, res) => res.send('TODO'));

export default router;
```

Router for handling requests to `/posts` endpoint

`src/router/postRouter.js`

```javascript
import express from 'express';

const router = express.Router();

router.param('id', (req, res, next) => next());

router
  .route('/posts')
  .get((req, res) => res.send('TODO'))
  .post((req, res) => res.send('TODO'));

router
  .route('/posts/:id')
  .get((req, res) => res.send('TODO'))
  .put((req, res) => res.send('TODO'))
  .delete((req, res) => res.send('TODO'));

export default router;
```

## 2.4 Versioning our API

We created routers for `/authors` & `/posts` above but what we actually want is for those endpoints to be mounted on our API version so we can access them through `/api/v1/authors` & `/api/v1/posts` respectively.

Let's create an `index.js` file inside `router/` directory and mount our routers to our api version path.

`src/router/index.js`

```javascript
import authorRouter from './authorRouter';
import postRouter from './postRouter';

export default app => {
  app.get('/api/v1/', (req, res) => {
    res.json({ message: 'Awesome blog API yo!' });
  });

  app.use('/api/v1/', [authorRouter, postRouter]);
};
```

## 2.5 Registering our routers

Now that we've versioned our API and mounted our routers to it, we need to tell our server that those routes exists & should be available to the outside world.
Going back to `server.js` we'll import our `index.js` file from `router/` directory and register it on the server.

`src/server.js`

```javascript
import express from 'express';
import registerRouters from './router';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

registerRouters(app);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
```

If you visit http://localhost:8000/api/v1 now, you should see the API running

# Step 3 - Moving to Postgres

- Install database dependencies
- Connect database
- Create database models (tables)
- Register models with database
- Initialize database

Still here? Good! We'll now integrate postgres with our API. If you haven't created an account on [ElephantSQL](https://www.elephantsql.com/), now is a good time to do so.

## 3.1 Install tools for working with postgres

```bash
$ npm install pg node-postgres dotenv
```

### Create an environment variable

To securely save our database URL, we'll create a `.env` file in our project root folder and put the generated URL from elephantSQL in an environment variable.

```
DB_URL=postgres://user:password@host:port/database
```

## 3.2 Connecting to the database

`src/db/index.js`

```javascript
import { Pool } from 'pg';
import env from 'dotenv';

env.config();

const pool = new Pool({
  connectionString: process.env.DB_URL
});
```

## 3.3 Creating the database tables

`src/db/models/author.js`

```javascript
export default {
  CREATE_TABLE: `CREATE TABLE IF NOT EXISTS authors (
        id serial PRIMARY KEY,
        name VARCHAR (150) NOT NULL
    )`
};
```

`src/db/models/author.js`

```javascript
export default {
  CREATE_TABLE: `CREATE TABLE IF NOT EXISTS posts (
    id serial PRIMARY KEY,
    author_id serial REFERENCES authors(id) ON DELETE CASCADE,
    title VARCHAR (150) NOT NULL,
    content text,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
)`
};
```

## 3.5 Register models with DB

`src/db/models/index.js`

```javascript
import authors from './author';
import posts from './post';

export default async client => {
  try {
    await client.query(authors.CREATE_TABLE);
    await client.query(posts.CREATE_TABLE);

    console.log('Initialized models');
  } catch (error) {
    console.log(error);
  }
};
```

`src/db/index.js`

```javascript
import { Pool } from 'pg';
import models from './models';
import env from 'dotenv';

env.config();

const pool = new Pool({
  connectionString: process.env.DB_URL
});

(async () => {
  const client = await pool.connect();
  try {
    // start transaction
    await client.query('BEGIN');
    await models(client);
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.log(error);
  } finally {
    client.release();
  }
})();

export default pool;
```

## 3.4 Initialize database

`src/server.js`

```javascript
import './db';
...
```

# Step 4 - Implement controller logic

- Create controllers
- Implement controller logic
- Putting it all together

### Post Controller

`src/controllers/postController.js`

```javascript
import db from '../db';

export default class PostController {}
```

#### Controller Middleware

```javascript
...

static findById(req, res, next) {
    const { id } = req.params || {};

    if (!id) {
      res.status(400).send({ message: 'Please provide post ID.' });
      return;
    }

    db.query(`SELECT COUNT(*) FROM ${TABLE} WHERE id = $1`, [id])
      .then(({ rows }) => {
        if (rows[0].count <= 0) return res.status(404).send({ message: `Post with ID "${id}" not found.` });

        // put the post id on request object
        req.postId = id;
        return next();
      })
      .catch(({ message }) => res.status(500).send({ message }));
  }
```

#### Get posts

```javascript
...

static get(req, res) {
    db.query(`SELECT * FROM ${TABLE}`)
      .then(result => res.send(result.rows))
      .catch(({ message }) => res.status(500).send({ message }));
  }
```

#### Create post

```javascript
...

static create(req, res) {
    const { author_id: authorId, title, content } = req.body || {};

    if (!authorId) {
      res.status(400).send({ message: 'Please provide post author ID.' });
      return;
    }

    if (!title || !content) {
      res.status(400).send({ message: 'Post title and content are required.' });
      return;
    }

    db.query(`INSERT INTO ${TABLE} (author_id, title, content) VALUES ($1, $2, $3)`, [
      authorId,
      title,
      content,
    ])
      .then(() => res.status(201).send())
      .catch(({ message }) => res.status(500).send({ message }));
  }
```

#### Get post by ID

```javascript
...

static getPost(req, res) {
    db.query(`SELECT * FROM ${TABLE} WHERE id = $1`, [req.postId])
      .then(result => res.send(result.rows[0]))
      .catch(({ message }) => res.status(500).send({ message }));
  }
```

### Author Controller

`src/controllers/authorController.js`

```javascript
import db from '../db';

export default class AuthorController {}
```

#### Contoller Middleware

```javascript
    ...

    static findById(req, res, next) {
        const { id } = req.params || {};

        if (!id) {
          res.status(400).send({ message: 'Please provide author ID.' });
          return;
        }

        db.query('SELECT COUNT(*) FROM authors WHERE id = $1', [id])
          .then(({ rows }) => {
            if (rows[0].count <= 0) return res.status(404).send({ message: `Author with ID  "${id}" not found.` });

            // put the author id on request object
            req.authorId = id;
            return next();
          })
          .catch(({ message }) => res.status(500).send({ message }));
    }
```

#### Get authors

```javascript
    ...

    static get(req, res) {
        db.query('SELECT id, name FROM authors')
          .then(result => res.send(result.rows))
          .catch(({ message }) => res.status(500).send({ message }));
    }
```

#### Create author

```javascript
    ...

    static create(req, res) {
      const { name } = req.body || {};

      if (!name) {
        res.status(400).send({ message: 'Author name is required.' });
        return;
      }

      db.query('INSERT INTO authors (name) VALUES ($1)', [name])
        .then(() => res.status(201).send())
        .catch(({ message }) => res.status(500).send({ message }));
    }
```

#### Delete author

```javascript
    ...

    static remove(req, res) {
      db.query('DELETE FROM authors where id = $1', [req.authorId])
        .then(() => res.status(203).send())
        .catch(({ message }) => res.status(500).send({ message }));
    }
```

#### Update author

```javascript
  ...

  static update(req, res) {
    const { name } = req.body || {};

    if (!name) {
      res.status(400).send({ message: 'Please provide new name for author.' });
      return;
    }

    db.query('UPDATE authors SET name = $1 WHERE id = $2', [name, req.authorId])
      .then(() => res.send())
      .catch(({ message }) => res.status(500).send({ message }));
  }
```

#### Get author by ID

```javascript
    ...

    static getAuthor(req, res) {
        db.query('SELECT * FROM authors WHERE id = $1', [req.authorId])
      .then(result => res.send(result.rows[0]))
      .catch(({ message }) => res.status(500).send({ message }));
    }
```

#### Use controller in route

`src/router/authorRouter.js`

```javascript
import express from 'express';
import AuthorController from '../controllers/authorController';

const router = express.Router();

router.param('id', AuthorController.findById);

router
  .route('/authors')
  .get(AuthorController.get)
  .post(AuthorController.create);

router
  .route('/authors/:id')
  .get(AuthorController.getAuthor)
  .put(AuthorController.update)
  .delete(AuthorController.remove);

router.route('/authors/:id/posts').get(AuthorController.getPosts);

export default router;
```
