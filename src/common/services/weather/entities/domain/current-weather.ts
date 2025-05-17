import { IsString, IsNumber } from 'class-validator';

export class CurrentWeather {
  @IsNumber()
  temperature: number;

  @IsNumber()
  humidity: number;

  @IsString()
  description: string;
}
