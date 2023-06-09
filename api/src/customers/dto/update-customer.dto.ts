import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  customerProfile: string;

  @IsString()
  name: string;

  @IsString()
  email?: string;

  @IsString()
  address?: string;

  @IsString()
  phoneNumber?: string;

  @IsString()
  city?: string;

  @IsString()
  postalCode?: string;

  @IsString()
  country?: string;
}
