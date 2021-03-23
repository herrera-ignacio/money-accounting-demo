import { IsEmpty, IsEnum, IsPositive } from 'class-validator';
import { TransactionInput, TransactionType } from '../interfaces';
import { EntityDto } from '../../entity.dto';

export class TransactionInputDto extends EntityDto implements TransactionInput {
  @IsEnum(TransactionType)
  type: TransactionType;

  @IsPositive()
  amount: number;

  @IsEmpty()
  accountId: string;
}
