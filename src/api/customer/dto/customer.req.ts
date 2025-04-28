import { IsBoolean, IsString } from 'class-validator';

export class CustomerReq {
  @IsString()
  email: string;

  @IsString()
  mobile: string;

  @IsString()
  addressLine1: string;

  @IsString()
  addressLine2?: string;

  @IsString()
  town: string;

  @IsString()
  state: string;

  @IsString()
  postCode: string;

  @IsString()
  country: string;

  @IsBoolean()
  useAsBillingAddress: boolean;
}
