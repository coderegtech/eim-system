import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  customerId: number;

  @IsNumber()
  totalAmount: number;

  @IsString()
  status: string;

  @IsDate()
  orderDate: Date;
}
