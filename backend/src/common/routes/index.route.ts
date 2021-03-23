import { Router } from 'express';
import { Route } from '../interfaces';
import { IndexController } from '../controllers';

export class IndexRoute implements Route {
  public path = '/';
  public router = Router();
  private indexController = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(this.path, this.indexController.index);
  }
}
