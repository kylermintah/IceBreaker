/* eslint-disable no-invalid-this */
/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
// const EventModel = require('../../models/events/events.model');

import {ControllerInterface} from '../../utils/controller.interface';
import path, { relative } from 'path';
// import UserFunctions from './users.functions';
import * as express from 'express';
import MatcherRoutes from './matcher.routes.config';
import Debug from 'debug';
import validator from 'validator';
var spawn = require("child_process").spawn; 
const debug = Debug('matchers.controller');

class MatcherController implements ControllerInterface {
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post(MatcherRoutes.rootPath, this.runMatch);
    this.router.get(MatcherRoutes.runMatch, this.showAboutPage);
  }
  
  showAboutPage = async (req:express.Request, res:express.Response) => {
    res.status(200)
    .render(path.join(__dirname, '../public/views/about'));
  };

  runMatch = async (req:express.Request, res:express.Response) => {
    
      
    // Parameters passed in spawn - 
    // 1. type_of_script 
    // 2. list containing Path of the script 
    //    and arguments for the script  
      
    // E.g : http://localhost:3000/name?firstname=Mike&lastname=Will 
    // so, first name = Mike and last name = Will 
    var process = spawn('python',['../../services/matcher.py', 
                            req.query.entries] ); 
  
    // Takes stdout data from script which executed 
    // with arguments and send this data to res object 
    process.stdout.on('data', function(data:any) { 
      res.status(200)
      .render(path.join(__dirname, '../public/views/match-results'), 
      {results: String(data)});
    } ) 
  };

}

export default MatcherController;
