import { IsString } from 'class-validator';

export class CreateTableOrderDto {
  @IsString()
  tableNumber: number;

  @IsString()
  items: string;

  @IsString()
  totalPrice: number;

  @IsString()
  orderTime: string;
}
