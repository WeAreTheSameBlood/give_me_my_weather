import { Module } from '@nestjs/common';
import { WeatherModule } from '@modules/weather/weather.module';
import { SubscriptionModule } from '@modules/subscriptions/subscription.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchedulerModule } from '@services';
import { HealthModule } from './modules/health/health.module';

const featuresModules = [WeatherModule, SubscriptionModule, HealthModule];
const internalModules = [SchedulerModule];

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ...featuresModules,
    ...internalModules,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
