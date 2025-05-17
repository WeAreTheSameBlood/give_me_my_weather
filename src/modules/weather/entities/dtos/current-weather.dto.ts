import { IsString, IsNumber } from 'class-validator';

export class CurrentWeatherDTO {
  @IsNumber()
  temperature: number;

  @IsNumber()
  humidity: number;

  @IsString()
  description: string;
}
