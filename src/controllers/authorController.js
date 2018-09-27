import db from '../db';

export default class AuthorController {
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
