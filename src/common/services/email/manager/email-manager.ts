import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
import { CurrentWeather } from "@common/services/weather/entities/domain/current-weather"
import { Subscription } from '@modules/subscriptions/entities/storage/subscription';

@Injectable()
export class EmailManager {
  // MARK: - Properties
  private readonly fromAddress: string;
  private readonly confirmBaseUrl: string;

  // MARK: - Init
  constructor(private readonly config: ConfigService) {
    const apiKey = this.config.get<string>('SENDGRID_API_KEY')!;
    this.fromAddress = this.config.get<string>('EMAIL_FROM')!;
    this.confirmBaseUrl = this.config.get<string>('APP_CONFIRM_URL')!;
    SendGrid.setApiKey(apiKey);
  }

  // MARK: - Confirm
  async sendConfirmation(email: string, token: string) {
    const link = `${this.confirmBaseUrl}/confirm/${token}`;
    const html = `
      <p>Thank you for subscribing! Please click the button below to confirm your subscription:</p>
      <p>
        <a href="${link}" style="display:inline-block;padding:10px 20px;background-color:#28a745;color:#ffffff;text-decoration:none;border-radius:5px;">
          Confirm Subscription
        </a>
      </p>
      <p>If the button does not work, copy and paste the following link into your browser:<br/>
        <a href="${link}">${link}</a>
      </p>
      <p>This is a reusable link</p>
    `;

    try {
      const [response] = await SendGrid.send({
        to: email,
        from: this.fromAddress,
        subject: 'Confirmation of subscription to weather updates',
        html,
      });
    } catch (err) {
      throw new HttpException(
        'Cannot send confirmation email',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  // MARK: - Send Current
  async sendCurrentWeather(
    items: { sub: Subscription; weather: CurrentWeather }[],
  ) {
    const tasks = items.map(({ sub, weather }) =>
      this.sendCurrentWeatherToEmail(sub, weather),
    );

    Promise.all(tasks);
  }

  // MARK: - Private
  private async sendCurrentWeatherToEmail(
    sub: Subscription,
    weather: CurrentWeather,
  ) {
    const unsubLink = `${this.confirmBaseUrl}/unsubscribe/${sub.id}`;
    const html = `
      <h2>Current Weather Update</h2>
      <ul>
        <li>Temperature:  ${weather.temperature}°C</li>
        <li>Humidity:     ${weather.humidity}%</li>
        <li>Description:  ${weather.description}</li>
      </ul>
      <p style="margin-top:20px;">
        <a href="${unsubLink}" style="color:#888888; text-decoration:none; font-size:12px;">
          Unsubscribe
        </a>
        <p>If the button does not work, copy and paste the following link into your browser:<br/>
          <a href="${unsubLink}">${unsubLink}</a>
        </p>
      </p>
      <p>Thank you for using our service!</p>
    `;
    try {
      const [response] = await SendGrid.send({
        to: sub.email,
        from: this.fromAddress,
        subject: `Current Weather for U <3`,
        html,
      });
    } catch (err) {
      throw new HttpException(
        'Cannot send current weather email',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
