import { Module } from '@nestjs/common';
import { WeatherController } from './controllers/weather.controller';
import { WeatherService } from './services/weather.service';
import { WeatherManagerModule } from '@services';

@Module({
  imports: [WeatherManagerModule],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
