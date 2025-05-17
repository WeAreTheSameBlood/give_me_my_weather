import { Module } from '@nestjs/common';
import { EmailManager } from './manager/email-manager';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [EmailManager],
  exports: [EmailManager],
})
export class EmailManagerModule {}
