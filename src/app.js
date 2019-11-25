import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from 'morgan';

import indexRouter from './routes';

class App {
  constructor() {
    this.app = express();
    this.initMiddlewares();
    this.initRoutes();
  }

  initMiddlewares = () => {
    this.app.use(logger('dev'));
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(bodyParser.json());
  }

  initRoutes = () => {
    this.app.use('/', indexRouter);
  }
}
export default new App().app;
