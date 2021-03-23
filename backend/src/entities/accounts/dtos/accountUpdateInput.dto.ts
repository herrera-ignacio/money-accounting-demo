import { IsString, IsOptional, IsUUID } from 'class-validator';
import { AccountUpdateInput } from '../interfaces';

export class AccountUpdateInputDto implements AccountUpdateInput {
  @IsUUID()
  uuid: string;

  @IsOptional()
  @IsString()
  owner: string;
}
