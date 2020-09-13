/* eslint-disable require-jsdoc */

import {default as config } from './config/index';
import MatchController from './api/matcher/matcher.controller';
import App from './config/app.config';

const app = new App([
  new MatchController(),
],

Number(config.port));
console.log(`this is the port ${config.port}`);
app.listen();
