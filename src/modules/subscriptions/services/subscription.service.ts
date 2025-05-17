import { Injectable } from '@nestjs/common';
import { NewSubscribeDTO } from '../entities/dtos/new-subscripe.dto';
import { SubscriptionsRepository } from '../repositories/subscriptions.repository';
import { Subscription } from '../entities/storage/subscription';

@Injectable()
export class SubscriptionsService {
  // MARK: - Init
  constructor(
    private readonly repo: SubscriptionsRepository
  ) { }

  // MARK: - Subscribe
  async subscribe(newSubscribeDTO: NewSubscribeDTO): Promise<boolean> {
    try {
      const newSub: Subscription = await this.repo.create({
        email: newSubscribeDTO.email,
        city: newSubscribeDTO.city,
        frequency: newSubscribeDTO.frequency
      })
      return true;
    } catch {
      return false;
    }
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
