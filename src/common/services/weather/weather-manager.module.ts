import { Module } from '@nestjs/common';
import { WeatherManager } from './manager/weather-manager';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [WeatherManager],
  exports: [WeatherManager],
})
export class WeatherManagerModule {}
