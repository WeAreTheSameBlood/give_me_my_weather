import { Frequency } from "@common/entities/domain/frequency.enum";
import { IsIn, IsString } from "class-validator";

export class NewSubscribeDTO {
  @IsString()
  email: string;

  @IsString()
  city: string;

  @IsString()
  @IsIn([Frequency.HOURLY, Frequency.DAILY])
  frequency: string;
}