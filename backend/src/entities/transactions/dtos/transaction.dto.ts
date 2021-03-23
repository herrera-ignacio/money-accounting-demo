import { IsUUID, IsDate, IsEmpty } from 'class-validator';
import { ITransaction } from '../interfaces';
import { TransactionInputDto } from './transactionInput.dto';

export class TransactionDto extends TransactionInputDto implements ITransaction {
  @IsEmpty()
  accountId: string;

  @IsUUID()
  uuid: string;

  @IsDate()
  createdAt: Date;
}
