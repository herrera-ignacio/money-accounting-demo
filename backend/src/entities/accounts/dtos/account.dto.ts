import { IsUUID, IsDate, IsNumber } from 'class-validator';
import { IAccount } from '../interfaces';
import { AccountInputDto } from './accountInput.dto';

export class AccountDto extends AccountInputDto implements IAccount {
  @IsUUID()
  uuid: string;

  @IsNumber()
  balance: number;

  @IsDate()
  createdAt: Date;
}
