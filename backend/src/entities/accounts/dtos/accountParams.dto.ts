import { IsUUID } from 'class-validator';

export class AccountParamsDto {
  @IsUUID()
  accountId: string;
}
