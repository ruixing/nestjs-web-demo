import { Controller, Get, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('echo')
  echo(): string {
    return JSON.stringify({a: 1});
  }
  
  @Put('echo-put')
  echoUut(): string {
    return JSON.stringify({a: 2});
  }
}
