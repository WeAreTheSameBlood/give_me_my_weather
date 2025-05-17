import { Injectable } from '@nestjs/common';
import { WeatherManager } from '@services';

@Injectable()
export class WeatherService {
  // MARK: - Init
    constructor(
        private readonly weatherManager: WeatherManager
    ) { }

  // MARK: - Current Weather
  async getCurrentWeather(city: string) {
    return await this.weatherManager.getCurrentWeather(city);
  }
}
