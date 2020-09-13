/* eslint-disable no-unused-vars */
/* eslint-disable no-invalid-this */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import express from 'express';
import path from 'path';
import chalk from 'chalk';
import bodyParser from 'body-parser';
import {ControllerInterface} from '../utils/controller.interface';
import Debug from 'debug';
const debug = Debug('app');

class App {
  public app:express.Application;
  public port: number;
  // private _auth: Auth;

  constructor(controllers: ControllerInterface[], port: number) {
    this.app = express();
    this.port = port;
    // this._auth = new Auth();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.disable('x-powered-by') //See https://expressjs.com/en/advanced/best-practice-security.html
    this.app.use(express.static(path.join(__dirname, '../api/public')));
    console.log(path.join(__dirname, '../api/public'))
    this.app.set('view engine', 'ejs');
    this.app.use(this.authMiddleware);
  }

  private authMiddleware = async (request: express.Request,
    response: express.Response, next: express.NextFunction) => {
    debug(`${request.method} ${request.path} ${String(request.query.key)}`);
    next();
  }

  private initializeControllers = (controllers: ControllerInterface[]) => {
    controllers.forEach((controller: ControllerInterface) => {
      this.app.use('/', controller.router);
    });
    this.app.get('/about', (req:express.Request, res: express.Response)=>{
      res.status(200)
        .render(path.join(__dirname, '../api/public/views/about'));
    });
    this.app.get('/feedback', (req:express.Request, res: express.Response)=>{
      res.status(200)
        .render(path.join(__dirname, '../api/public/views/feedback'));
    });
    //Home Route
    this.app.use('/', (req:express.Request, res: express.Response)=>{
      res.status(200)
        .render(path.join(__dirname, '../api/public/views/welcome'));
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
