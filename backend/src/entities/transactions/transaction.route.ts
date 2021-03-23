import { Router } from 'express';
import { Route, Link } from '../../common/interfaces';
import {
  TransactionInputDto,
  TransactionByIdParamsDto,
  TransactionQueryParamsDto,
} from './dtos';
import { TransactionsController } from './transaction.controller';
import { transactionErrorMiddleware } from './transactionError.middleware';
import { HATEOASLinks, validationMiddleware, queryParserMiddleware } from '../../common/middlewares';

export class TransactionsRoute implements Route {
  public path = '/transactions';

  public router = Router();

  public links: Record<string, Link> = {
    read: { method: 'GET', path: this.path },
    readById: { method: 'GET', path: `${this.path}/:transactionId` },
    create: { method: 'POST', path: this.path },
  };

  private transactionsController = new TransactionsController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.get(
      this.links.read.path,
      validationMiddleware(TransactionQueryParamsDto, { skipMissingProperties: true }, 'params'),
      HATEOASLinks(this.links),
      queryParserMiddleware({ where: ['accountId'] }),
      this.transactionsController.get,
    );

    this.router.get(
      this.links.readById.path,
      validationMiddleware(TransactionByIdParamsDto, { }, 'params'),
      HATEOASLinks(this.links),
      this.transactionsController.getById,
    );

    this.router.post(
      this.links.create.path,
      validationMiddleware(TransactionInputDto),
      HATEOASLinks(this.links),
      this.transactionsController.create,
      transactionErrorMiddleware,
    );
  }
}
