import { Router } from 'express';
import { Route, Link } from '../../common/interfaces';
import { AccountInputDto, AccountUpdateInputDto, AccountParamsDto } from './dtos';
import { AccountsController } from './account.controller';
import {
  HATEOASLinks,
  validationMiddleware,
  queryParserMiddleware,
  methodNotAllowedMiddleware,
} from '../../common/middlewares';
import { TransactionsRoute } from '../transactions/transaction.route';

export class AccountsRoute implements Route {
  private transactionsRoute = new TransactionsRoute();

  public path = '/accounts';

  public router = Router();

  public links: Record<string, Link> = {
    read: { method: 'GET', path: this.path },
    readById: { method: 'GET', path: `${this.path}/:accountId` },
    update: { method: 'PUT', path: this.path },
    create: { method: 'POST', path: this.path },
    delete: { method: 'DELETE', path: `${this.path}/:accountId` },
    transactions: { method: 'GET', path: `${this.transactionsRoute.path}?accountId=:accountId` },
  };

  private accountsController = new AccountsController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.get(
      this.links.read.path,
      HATEOASLinks(this.links),
      queryParserMiddleware({ where: ['owner'] }),
      this.accountsController.get,
    );

    this.router.get(
      this.links.readById.path,
      validationMiddleware(AccountParamsDto, {}, 'params'),
      HATEOASLinks(this.links),
      this.accountsController.getById,
    );

    this.router.put(
      this.links.update.path,
      validationMiddleware(AccountUpdateInputDto),
      HATEOASLinks(this.links),
      this.accountsController.update,
    );

    this.router.post(
      this.links.create.path,
      methodNotAllowedMiddleware,
      validationMiddleware(AccountInputDto),
      HATEOASLinks(this.links),
      this.accountsController.create,
    );

    this.router.delete(
      this.links.delete.path,
      methodNotAllowedMiddleware,
      validationMiddleware(AccountParamsDto, {}, 'params'),
      HATEOASLinks(this.links),
      this.accountsController.delete,
    );
  }
}
