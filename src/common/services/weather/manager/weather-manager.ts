import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { CurrentWeather } from '../entities/domain/current-weather';
import { Subscription } from '@src/modules/subscriptions/entities/storage/subscription';

@Injectable()
export class WeatherManager {
  // MARK: - Properties
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly currentUrl: string = "/current.json";

  // MARK: - Init
  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
  ) {
    this.apiKey =   this.config.get<string>('WEATHER_API_KEY')!;
    this.baseUrl =  this.config.get<string>('WEATHER_API_BASE_URL')!;
  }

  // MARK: - Current Weathers
  async getCurrentWeathers(
    subs: Subscription[],
  ): Promise<{
    sub: Subscription;
    weather: CurrentWeather
  }[]> {
    const tasks = subs.map(async (sub) => {
      const weather = await this.getOneCurrentWeather(sub.city);
      return { sub, weather };
    });
    return Promise.all(tasks);
  }

  // MARK: - Current One Weather
  async getOneCurrentWeather(city: string): Promise<CurrentWeather> {
    const resultUrl = this.baseUrl + this.currentUrl;
    const params = {
      key: this.apiKey,
      q: city,
      lang: 'en',
    };

    let response: AxiosResponse<any, any>;
    try {
      response = await firstValueFrom(
        this.httpService.get(resultUrl, { params }),
      );
    } catch {
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
    }

    const data = response.data;
    if (!data || !data.current) {
      throw new HttpException('City not found', HttpStatus.NOT_FOUND);
    }
    
    const description: string = data.location.name + ", "
      + data.location.region + ", " + data.location.country
      + ", local time: " + data.location.localtime;
    
    return {
      temperature:  data.current.temp_c,
      humidity:     data.current.humidity,
      description:  description,
    };
  }
}
