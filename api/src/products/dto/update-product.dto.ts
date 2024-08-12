import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  // @IsNumber()
  // id: number;
  // @IsNotEmpty()
  // @IsString()
  // name: string;
  // @IsNotEmpty()
  // @IsNumber()
  // categoryId: number;
  // @IsNotEmpty()
  // @IsNumber()
  // price: number;
  // @IsString()
  // description: string;
  // @IsNotEmpty()
  // @IsNumber()
  // quantity: number;
  // @IsNotEmpty()
  // @IsNumber()
  // supplierId: number;
}
