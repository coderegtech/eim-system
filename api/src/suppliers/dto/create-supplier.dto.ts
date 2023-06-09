import { IsString } from 'class-validator';

export class CreateSupplierDto {
  @IsString()
  supplierName: string;

  @IsString()
  contactName: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  email: string;

  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  postalCode: string;

  @IsString()
  country: string;
}
