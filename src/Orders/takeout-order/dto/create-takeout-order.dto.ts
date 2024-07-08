import { IsNumber, IsString } from 'class-validator';

export class CreateTakeoutOrderDto {
  @IsString()
  items: string; // You might want to use a more complex type for items

  @IsNumber()
  totalPrice: number;

  @IsString()
  orderTime: string;
}
