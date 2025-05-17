import { Module } from '@nestjs/common';
import { WeatherController } from './controllers/weather.controller';
import { WeatherService } from './services/weather.service';

@Module({
  controllers: [WeatherController],
  providers: [WeatherService]
})
export class WeatherModule {}
