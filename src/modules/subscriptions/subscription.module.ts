import { Module } from '@nestjs/common';
import { SubscriptionsController } from './controllers/subsriptions.controller';
import { SubscriptionsService } from './services/subscription.service';

@Module({
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService]
})
export class SubscriptionModule {}
