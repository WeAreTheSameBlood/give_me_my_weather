import { Body, HttpCode, HttpStatus, Controller, Post, Get, Param, BadRequestException, UseInterceptors, NotFoundException } from '@nestjs/common';
import { NewSubscribeDTO } from '../entities/dtos/new-subscripe.dto';
import { SubscriptionsService } from '../services/subscription.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@ApiTags('subscription')
@Controller()
export class SubscriptionsController {
  // MARK: - Init
  constructor(
    private readonly subscriberService: SubscriptionsService
  ) { }

  // MARK: - POST - Subscribe
  @Post('subscribe')
  @ApiResponse({
    status: 200,
    description: 'Subscription successful. Confirmation email sent',
  })
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(AnyFilesInterceptor())
  async subscribe(
    @Body() newSubscribeDto: NewSubscribeDTO
  ): Promise<void> {
    if (
      !newSubscribeDto ||
      !['hourly', 'daily'].includes(newSubscribeDto.frequency)
    ) {
      throw new BadRequestException('Invalid input');
    }

    await this.subscriberService.subscribe(newSubscribeDto);
  }

  // MARK: - GET - Confirm
  @Get('confirm/:token')
  @HttpCode(HttpStatus.OK)
  async confirmSubscription(
    @Param('token') token: string
  ): Promise<void> {
    if (!token) {
      throw new NotFoundException('Token not found');
    }

    const result = await this.subscriberService.confirmSubscription(token);
    if (!result) {
      throw new BadRequestException('Invalid token');
    }

    console.log('confirmSubscription for', {token});
  }

  // MARK: - GET - Unsubscribe
  @Get('unsubscribe/:token')
  @HttpCode(HttpStatus.OK)
  async unsubscribe(
    @Param('token') token: string
  ): Promise<void> {
    if (!token) {
      throw new NotFoundException('Token not found');
    }

    const result = await this.subscriberService.unsubscribe(token);
    if (!result) {
      throw new BadRequestException('Invalid token');
    }
  }
}
