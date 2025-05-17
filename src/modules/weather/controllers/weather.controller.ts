import {
  BadRequestException,
  Controller, Get,
  HttpCode, HttpStatus,
  Query,
} from '@nestjs/common';
import { WeatherService } from '../services/weather.service';
import { CurrentWeather } from '@common/services/weather/entities/domain/current-weather';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('weather')
@Controller('weather')
export class WeatherController {
  // MARK: - Init
    constructor(
        private readonly weatherService: WeatherService
    ) { }

  // MARK: - GET - Get Weather
  @Get()
  @HttpCode(HttpStatus.OK)
  async getWeather(
      @Query('city') city: string
  ): Promise<CurrentWeather> {
    if (!city) {
      throw new BadRequestException('Invalid request');
    }

    return await this.weatherService.getCurrentWeather(city);
  }
}
