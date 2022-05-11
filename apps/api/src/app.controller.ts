import { Controller, Get } from '@nestjs/common';
import { Public } from './decorators';

@Controller()
export class AppController {
  @Get()
  @Public()
  healthCheck(): string {
    return '';
  }
}
