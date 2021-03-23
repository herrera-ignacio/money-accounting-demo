import { IsOptional, IsUUID } from 'class-validator';

export class TransactionByIdParamsDto {
  @IsUUID()
  transactionId: string;
}

export class TransactionQueryParamsDto {
  @IsUUID()
  @IsOptional()
  accountId: string;
}
