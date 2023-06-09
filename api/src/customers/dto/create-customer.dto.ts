import { IsString } from 'class-validator';

export class CreateCustomerDto {
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
