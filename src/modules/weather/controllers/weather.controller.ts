import { BadRequestException, Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { WeatherService } from '../services/weather.service';
import { CurrentWeatherDTO } from '../entities/dtos/current-weather.dto';
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
  ): Promise<CurrentWeatherDTO> {
    if (!city) {
      throw new BadRequestException('City query parameter is required');
    }

    const currentWeather = await this.weatherService.getCurrentWeather(city);
    const weatherResult: CurrentWeatherDTO = {
      temperature: currentWeather.temperature,
      humidity: currentWeather.humidity,
      description: currentWeather.description,
    };
    return weatherResult;
  }
}
