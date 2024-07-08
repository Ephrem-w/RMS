import { PartialType } from '@nestjs/mapped-types';
import { CreateTakeoutOrderDto } from './create-takeout-order.dto';
import { IsNumber } from 'class-validator';

export class UpdateTakeoutOrderDto extends PartialType(CreateTakeoutOrderDto) {
  @IsNumber()
  id: number;
}
