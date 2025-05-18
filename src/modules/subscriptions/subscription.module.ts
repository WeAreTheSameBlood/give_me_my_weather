import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionsController } from './controllers/subscriptions.controller';
import { SubscriptionsService } from './services/subscription.service';
import { SubscriptionsRepository } from './repositories/subscriptions.repository';
import { Subscription } from './entities/storage/subscription';
import { EmailManagerModule, WeatherManagerModule } from '@services';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subscription]),
    WeatherManagerModule,
    EmailManagerModule
  ],
  controllers: [SubscriptionsController],
  providers: [
    SubscriptionsService,
    SubscriptionsRepository
  ]
})
export class SubscriptionModule {}
