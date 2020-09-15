import { ControllerInterface } from '../../utils/controller.interface';
import path, { relative } from 'path';
import * as express from 'express';
import MatcherRoutes from './matcher.routes.config';
import Debug from 'debug';
import {spawn} from 'child_process';
const debug = Debug('matchers.controller');

class MatcherController implements ControllerInterface {
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(MatcherRoutes.rootPath, this.showMatchForm);
    this.router.post(MatcherRoutes.runMatch, this.runMatch);
  }

  showMatchForm = async (req: express.Request, res: express.Response) => {
    res.status(200)
      .render(path.join(__dirname, '../public/views/match'));
  };

  runMatch = async (req: express.Request, res: express.Response) => {
    var process = spawn('python', [
      path.join(__dirname, '../../services/matcher.py'), 
      req.body.entryList
    ]
    )
    
    // path.join(__dirname, '../../services/matcher.py')
    process.stdout.on('data', function (data) {
      res.status(200)
      .render(path.join(__dirname, '../public/views/results'),
        { results: String(data) });
    });

    process.stderr.on('data', function (data) {
      console.error(`stderr: ${data}`);
    });

    process.on('close', function (code) {
      console.log(code);
    });
  };

}

export default MatcherController;
