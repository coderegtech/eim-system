import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsNumber()
  id: number;

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
