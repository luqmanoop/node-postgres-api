import db from '../db';

export default class AuthorController {
  static findById(req, res, next) {
    const { id } = req.params || {};

    if (!id) {
      res.status(400).send({ message: 'Please provide author ID.' });
      return;
    }

    db.query('SELECT COUNT(*) FROM authors WHERE id = $1', [id])
      .then(({ rows }) => {
        if (rows[0].count <= 0) return res.status(404).send({ message: `Author with ID "${id}" not found.` });

        // put the author id on request object
        req.authorId = id;
        return next();
      })
      .catch(({ message }) => res.status(500).send({ message }));
  }

  /**
   * Get authors from database.
   */
  static get(req, res) {
    db.query('SELECT id, name FROM authors')
      .then(result => res.send(result.rows))
      .catch(err => res.status(500).send({ message: err.message }));
  }

  /**
   * Creates an author in DB.
   */
  static create(req, res) {
    const { name } = req.body || {};
    if (!name) {
      res.status(400).send({ message: 'Author name is required.' });
      return;
    }

    db.query('INSERT INTO authors (name) VALUES ($1)', [name])
      .then(() => res.status(201).send())
      .catch(err => res.status(500).send({ message: err.message }));
  }
}
