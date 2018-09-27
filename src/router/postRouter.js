import express from 'express';
import PostController from '../controllers/postController';

const router = express.Router();

router.param('id', PostController.findById);

// api/v1/posts
router
  .route('/posts')
  .get((req, res) => res.json({ msg: 'TODO. Post list' }))
  .post((req, res) => res.json({ msg: 'TODO. Post create' }));

router
  .route('/posts/:id')
  .get((req, res) => res.json({ msg: 'TODO. Author get' }))
  .put((req, res) => res.json({ msg: 'TODO. Author update' }))
  .delete((req, res) => res.json({ msg: 'TODO. Author delete' }));

export default router;
