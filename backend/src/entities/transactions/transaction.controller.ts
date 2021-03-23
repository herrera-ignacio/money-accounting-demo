import { Request, Response, NextFunction } from 'express';
import { EntityController } from '../entity.controller';
import { Transaction } from './transaction.entity';
import { TransactionDto } from './dtos';
import { TransactionsService } from './transaction.service';
import { testAccount } from '../../init';

export class TransactionsController extends EntityController<
Transaction,
TransactionDto,
TransactionsService
> {
  constructor(modelService = new TransactionsService()) {
    super(modelService, 'transactionId');
  }

  create = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const entity = this.modelService.create({
        ...req.body,
        accountId: testAccount.uuid,
      });

      res.status(201).json({ data: entity });
    } catch (error) {
      TransactionsService.releaseLock();
      next(error);
    }
  };
}
