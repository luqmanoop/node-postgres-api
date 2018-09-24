import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ msg: 'Awesome blog API yo!' });
});

// api/v1/authors
router
  .route('/authors')
  .get((req, res) => res.json({ msg: 'TODO. Author list' }))
  .post((req, res) => res.json({ msg: 'TODO. Author create' }));
router
  .route('/authors/:id')
  .get((req, res) => res.json({ msg: 'TODO. Author get' }))
  .update((req, res) => res.json({ msg: 'TODO. Author update' }))
  .delete((req, res) => res.json({ msg: 'TODO. Author delete' }));
router.route('/authors/:id/posts').get((req, res) => res.json({ msg: 'TODO. Author posts' }));

// api/v1/posts
router
  .route('/posts')
  .get((req, res) => res.json({ msg: 'TODO. Post list' }))
  .post((req, res) => res.json({ msg: 'TODO. Post create' }));
router
  .route('/posts/:id')
  .get((req, res) => res.json({ msg: 'TODO. Author get' }))
  .update((req, res) => res.json({ msg: 'TODO. Author update' }))
  .delete((req, res) => res.json({ msg: 'TODO. Author delete' }));

export default router;
