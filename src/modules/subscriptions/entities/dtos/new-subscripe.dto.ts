import { IsIn, IsString } from "class-validator";

export class NewSubscribeDTO {
  @IsString()
  email: string;

  @IsString()
  city: string;

  @IsString()
  @IsIn(['hourly', 'daily'])
  frequency: string;
}