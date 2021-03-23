import { IsString, IsOptional, IsNumber } from 'class-validator';
import { AccountInput } from '../interfaces';
import { EntityDto } from '../../entity.dto';

export class AccountInputDto extends EntityDto implements AccountInput {
  @IsString()
  owner: string;

  @IsOptional()
  @IsNumber()
  balance: number;
}
