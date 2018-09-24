import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';

export default (app) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(morgan('dev'));
};
