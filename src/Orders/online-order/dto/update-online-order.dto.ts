import { PartialType } from '@nestjs/mapped-types';
import { CreateOnlineOrderDto } from './create-online-order.dto';
import { IsNumber } from 'class-validator';

export class UpdateOnlineOrderDto extends PartialType(CreateOnlineOrderDto) {
  @IsNumber()
  id: number;
}
