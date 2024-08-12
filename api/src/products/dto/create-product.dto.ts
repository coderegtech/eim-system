import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  categoryId: number;

  @IsNotEmpty()
  @IsString()
  price: number;

  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  quantity: number;

  @IsNotEmpty()
  @IsString()
  supplierId: number;
}
