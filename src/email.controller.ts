import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendEmail(@Body() body, @Res() res) {
    const response = await this.emailService.sendEmail(body);
    res.status(HttpStatus.OK).json(response);
  }
}
