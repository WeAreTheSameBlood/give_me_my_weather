import { Injectable} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { WeatherManager, EmailManager } from '@services';
import { SubscriptionsRepository } from '@modules/subscriptions/repositories/subscriptions.repository';
import { Subscription } from '@modules/subscriptions/entities/storage/subscription';
import { Frequency } from '@common/entities/domain/frequency.enum';

@Injectable()
export class SchedulerManager {
  // MARK: - Init
  constructor(
    private readonly repo: SubscriptionsRepository,
    private readonly weatherManager: WeatherManager,
    private readonly emailManager: EmailManager,
  ) {}

  // MARK: - Hourly
  @Cron(CronExpression.EVERY_HOUR)
  async handleHourly() {
    const subs: Subscription[] = await this.repo.findByFrequency(
      Frequency.HOURLY,
    );
    const items = await this.weatherManager.getCurrentWeathers(subs);
    this.emailManager.sendCurrentWeather(items);
  }

  // MARK: - Daily
  //     ┌───────────── mins     (0–59)
  //     │ ┌─────────── hours    (0–23)
  //     │ │ ┌───────── days     (1–31)
  //     │ │ │ ┌─────── month    (0–11)
  //     │ │ │ │ ┌───── week day (0–6  Sun–Sat)
  //     * * * * *
  @Cron('0 9 * * *') // Every day at 9 a.m.
  async handleDaily() {
    const subs: Subscription[] = await this.repo.findByFrequency(
      Frequency.DAILY,
    );
    const items = await this.weatherManager.getCurrentWeathers(subs);
    this.emailManager.sendCurrentWeather(items);
  }
}
