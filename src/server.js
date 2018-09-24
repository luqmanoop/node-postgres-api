import express from 'express';
import registerMiddlewares from './middlewares';
import apiRouter from './router';

const app = express();
const PORT = process.env.PORT || 8000;

registerMiddlewares(app);
app.use('/api/v1', apiRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
