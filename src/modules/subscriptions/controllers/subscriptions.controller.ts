import { Body, HttpCode, HttpStatus, Controller, Post, Get, Param, BadRequestException, UseInterceptors } from '@nestjs/common';
import { NewSubscribeDTO } from '../entities/dtos/new-subscripe.dto';
import { SubscriptionsService } from '../services/subscription.service';
import { ApiTags } from '@nestjs/swagger';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@ApiTags('subscription')
@Controller()
export class SubscriptionsController {
  // MARK: - Init
  constructor(private readonly subscriberService: SubscriptionsService) {}

  // MARK: - POST - Subscribe
  @Post('subscribe')
  @HttpCode(HttpStatus.OK)
  @ApiTags('subscription')
  @UseInterceptors(AnyFilesInterceptor())
  async subscribe(@Body() newSubscribeDto: NewSubscribeDTO): Promise<void> {
    if (!newSubscribeDto) {
      throw new BadRequestException('Invalid input');
    }

    const result = await this.subscriberService.subscribe(newSubscribeDto);
  }

  // MARK: - GET - Confirm
  @Get('confirm/:token')
  @HttpCode(HttpStatus.OK)
  async confirmSubscription(@Param('token') token: string): Promise<void> {
    if (!token) {
      throw new BadRequestException('Invalid token');
    }

    const result = await this.subscriberService.confirmSubscription(token);
  }

  // MARK: - GET - Unsubscribe
  @Get('unsubscribe/:token')
  @HttpCode(HttpStatus.OK)
  async unsubscribe(@Param('token') token: string): Promise<void> {
    if (!token) {
      throw new BadRequestException('Invalid token');
    }

    const result = await this.subscriberService.unsubscribe(token);
  }
}
