import authorRouter from './authorRouter';

export default (app) => {
  app.get('/api/v1/', (req, res) => {
    res.json({ message: 'Awesome blog API yo!' });
  });

  app.use('/api/v1/', [authorRouter]);
};
