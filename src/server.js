import express from 'express';
import registerMiddlewares from './middlewares';
import registerRouter from './router';
import './db';

const app = express();
const PORT = process.env.PORT || 8000;

registerMiddlewares(app);
registerRouter(app);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
