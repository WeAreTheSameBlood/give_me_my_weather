import { Body, HttpCode, HttpStatus, Controller, Post, Get, Param, BadRequestException, UseInterceptors, NotFoundException, Header } from '@nestjs/common';
import { NewSubscribeDTO } from '../entities/dtos/new-subscripe.dto';
import { SubscriptionsService } from '../services/subscription.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { readFileSync } from 'fs';
import { join } from 'path';

@ApiTags('subscription')
@Controller()
export class SubscriptionsController {
  // MARK: - Init
  constructor(private readonly subscriberService: SubscriptionsService) {}

  // MARK: - GET - Subscribe
  @Get('subscribe')
  @Header('Content-Type', 'text/html')
  @HttpCode(HttpStatus.OK)
  async subscribePage(): Promise<string> {
    const subscribeHtml = readFileSync(
      join(__dirname, '../templates/subscribe.html'),
      'utf-8',
    );
    
    return subscribeHtml
  }

  // MARK: - POST - Subscribe
  @Post('subscribe')
  @ApiResponse({
    status: 200,
    description: 'Subscription successful. Confirmation email sent',
  })
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(AnyFilesInterceptor())
  async subscribe(@Body() newSubscribeDto: NewSubscribeDTO): Promise<void> {
    if (
      !newSubscribeDto ||
      !['hourly', 'daily'].includes(newSubscribeDto.frequency)
    ) {
      throw new BadRequestException('Invalid input');
    }

    console.log("sub req", newSubscribeDto);

    await this.subscriberService.subscribe(newSubscribeDto);
  }

  // MARK: - GET - Confirm
  @Get('confirm/:token')
  @HttpCode(HttpStatus.OK)
  async confirmSubscription(@Param('token') token: string): Promise<void> {
    if (!token) {
      throw new NotFoundException('Token not found');
    }

    const result = await this.subscriberService.confirmSubscription(token);
    if (!result) {
      throw new BadRequestException('Invalid token');
    }

    console.log('confirm req', token);
  }

  // MARK: - GET - Unsubscribe
  @Get('unsubscribe/:token')
  @HttpCode(HttpStatus.OK)
  async unsubscribe(@Param('token') token: string): Promise<void> {
    if (!token) {
      throw new NotFoundException('Token not found');
    }

    const result = await this.subscriberService.unsubscribe(token);
    if (!result) {
      throw new BadRequestException('Invalid token');
    }

    console.log('unsub req', token);
  }
}
