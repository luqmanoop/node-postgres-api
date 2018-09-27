import db from '../db';

export default class AuthorController {
  /**
   * Get authors from database
   */
  static get(req, res) {
    db.query('SELECT id, name FROM authors')
      .then(result => res.send(result.rows))
      .catch(err => res.status(500).send(err.message));
  }
}
