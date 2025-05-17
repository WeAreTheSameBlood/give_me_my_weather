import { Injectable } from '@nestjs/common';
import { NewSubscribeDTO } from '../entities/dtos/new-subscripe.dto';

@Injectable()
export class SubscriptionsService {
  // MARK: - Subscribe
  async subscribe(newSubscribeDTO: NewSubscribeDTO): Promise<boolean> {
    return true;
  }

  // MARK: - Confirm
  async confirmSubscription(token: string): Promise<boolean> {
    return true;
  }

  // MARK: - Unsubscribe
  async unsubscribe(token: string): Promise<boolean> {
    return true;
  }
}
