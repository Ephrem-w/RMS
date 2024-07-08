import { IsNumber, IsString } from 'class-validator';

export class CreateOnlineOrderDto {
  @IsString()
  deliveryAddress: string;

  @IsString()
  items: string;

  @IsNumber()
  totalPrice: number;

  @IsString()
  orderTime: string;
}
