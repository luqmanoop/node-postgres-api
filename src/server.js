import express from 'express';
import registerMiddlewares from './middlewares';

const app = express();
const PORT = process.env.PORT || 8000;

registerMiddlewares(app);

app.listen(PORT, () => {
  console.log('Server listening on port ');
});
