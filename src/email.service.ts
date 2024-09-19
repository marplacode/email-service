import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Logger } from '@nestjs/common';
import { STATUS_CODES } from 'http';

export interface EmailPayload {
  sender: { name: string; email: string; password: string };
  recipient: { email: string };
  subject: string;
  content: string;
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(private configService: ConfigService) {}

  async sendEmail(payload: EmailPayload) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      // gmail needs unique app password
      service: 'gmail',
      auth: {
        user: this.configService.sender.email,
        pass: this.configService.sender.pass,
      },
    });

    let info = await transporter.sendMail({
      from: payload.sender.name, // sender address
      to: payload.recipient.email, // list of receivers
      subject: payload.subject, // Subject line
      text: payload.content, // plain text body
    });

    this.logger.log(`email sent: ${info.messageId}`);

    return { id: info.messageId };
  }
}
