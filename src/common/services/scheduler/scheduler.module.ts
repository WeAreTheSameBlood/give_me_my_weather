import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailManagerModule, WeatherManagerModule } from '@services';
import { Subscription } from '@modules/subscriptions/entities/storage/subscription';
import { SubscriptionsRepository } from '@modules/subscriptions/repositories/subscriptions.repository';
import { SchedulerManager } from './manager/scheduler-manager';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Subscription]),
    WeatherManagerModule,
    EmailManagerModule,
  ],
    providers: [
        SchedulerManager,
        SubscriptionsRepository
    ],
})
export class SchedulerModule {}