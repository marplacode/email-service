import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { ConfigModule } from '@nestjs/config';
import config from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
  ],

  controllers: [EmailController],
  providers: [EmailService],
})
export class AppModule {}
