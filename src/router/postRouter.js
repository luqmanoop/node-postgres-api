import express from 'express';
import PostController from '../controllers/postController';

const router = express.Router();

router.param('id', PostController.findById);

// api/v1/posts
router
  .route('/posts')
  .get(PostController.get)
  .post(PostController.create);

router
  .route('/posts/:id')
  .get(PostController.getPost)
  .put(PostController.update)
  .delete(PostController.remove);

export default router;
