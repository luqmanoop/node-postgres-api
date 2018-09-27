import db from '../db';

const TABLE = 'posts';
export default class PostController {
  static findById(req, res, next) {
    const { id } = req.params || {};

    if (!id) {
      res.status(400).send({ message: 'Please provide post ID.' });
      return;
    }

    db.query(`SELECT COUNT(*) FROM ${TABLE} WHERE id = $1`, [id])
      .then(({ rows }) => {
        if (rows[0].count <= 0) return res.status(404).send({ message: `Post with ID "${id}" not found.` });

        // put the author id on request object
        req.postId = id;
        return next();
      })
      .catch(({ message }) => res.status(500).send({ message }));
  }
}
