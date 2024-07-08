import { PartialType } from '@nestjs/mapped-types';
import { CreateTableOrderDto } from './create-table-order.dto';
import { IsNumber } from 'class-validator';

export class UpdateTableOrderDto extends PartialType(CreateTableOrderDto) {
  @IsNumber()
  id: number;
}
