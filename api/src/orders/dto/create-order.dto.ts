import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  customerId: number;

  @IsNumber()
  productId: number;

  @IsNumber()
  totalAmount: number;

  @IsString()
  status: string;

  @IsNumber()
  quantity: number;

  @IsDate()
  orderDate: Date;
}
