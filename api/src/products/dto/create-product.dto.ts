import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  categoryId: number;

  @IsNumber()
  price: number;

  @IsString()
  description: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  supplierId: number;
}
