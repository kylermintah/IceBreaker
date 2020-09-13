/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
import MatcherController from '../api/matcher/matcher.controller';
import * as express from 'express';

export interface ControllerInterface {
  router: express.Router;
  initializeRoutes(): void;
}

export function createController(
  Controller: any,
): ControllerInterface {
  return new Controller();
}


export type Controller = MatcherController;
