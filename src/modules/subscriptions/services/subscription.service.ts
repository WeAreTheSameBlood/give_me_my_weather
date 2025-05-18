import { ConflictException, Injectable } from '@nestjs/common';
import { NewSubscribeDTO } from '../entities/dtos/new-subscripe.dto';
import { SubscriptionsRepository } from '../repositories/subscriptions.repository';
import { EmailManager, WeatherManager } from '@services';

@Injectable()
export class SubscriptionsService {
  // MARK: - Init
  constructor(
    private readonly repo: SubscriptionsRepository,
    private readonly weatherManager: WeatherManager,
    private readonly emailManager: EmailManager
  ) { }

  // MARK: - Subscribe
  async subscribe(
    newSubscribeDTO: NewSubscribeDTO
  ): Promise<void> {
    await this.weatherManager.getOneCurrentWeather(newSubscribeDTO.city);

    const newSub = await this.repo.create({
      email:     newSubscribeDTO.email,
      city:      newSubscribeDTO.city,
      frequency: newSubscribeDTO.frequency,
    });

    if (!newSub) {
      throw new ConflictException('Email already subscribed');
    }

    await this.emailManager.sendConfirmation(newSub.email, newSub.id);
  }

  // MARK: - Confirm
  async confirmSubscription(
    token: string
  ): Promise<boolean> {
    return await this.repo.setConfirm(token, true);
  }

  // MARK: - Unsubscribe
  async unsubscribe(token: string): Promise<boolean> {
    return await this.repo.setConfirm(token, false);
  }
}
