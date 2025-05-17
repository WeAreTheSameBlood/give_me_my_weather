import { Module } from '@nestjs/common';
import { WeatherModule } from '@modules/weather/weather.module';
import { SubscriptionModule } from '@modules/subscriptions/subscription.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

const featuresModules = [WeatherModule, SubscriptionModule];
const internalModules = [];

@Module({
  imports: [
    ScheduleModule.forRoot(),
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
