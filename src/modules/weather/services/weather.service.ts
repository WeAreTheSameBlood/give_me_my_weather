import { Injectable } from '@nestjs/common';

@Injectable()
export class WeatherService {
    // MARK: - Current Weather
    async getCurrentWeather(city: string) {
      return {
        temperature: 123,
        humidity: 46,
        description: "Some desc for place named as" + city,
      };
  }
}
