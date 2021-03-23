import { classToPlain, plainToClass } from 'class-transformer';
import { Transaction } from './transaction.entity';
import { TransactionDto } from './dtos';
import { EntityRepository } from '../entity.repository';

export class TransactionsRepository extends EntityRepository<Transaction, TransactionDto> {
  private static instance: TransactionsRepository;

  public static getInstance(): TransactionsRepository {
    if (!TransactionsRepository.instance) {
      TransactionsRepository.instance = new TransactionsRepository();
    }

    return TransactionsRepository.instance;
  }

  private constructor() {
    super();
  }

  transform = (model: Transaction, transformOptions = {}): TransactionDto => plainToClass(
    TransactionDto,
    classToPlain(model, transformOptions),
    transformOptions,
  );

  transformMany = (models: Transaction[]): TransactionDto[] => models.map(
    (model) => this.transform(model),
  );
}
