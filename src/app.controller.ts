import {
  Controller,
  Request,
  Get,
  Post,
  UseGuards,
  Render,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private readonly appService: AppService,
  ) {}

  @Get('page')
  //@UseGuards(JwtAuthGuard)
  @Render('page')
  root() {
    return { message: 'Here is the HTML page only when you are auhtorized!' };
  }
  @Get('start')
  //@UseGuards(JwtAuthGuard)
  @Render('index')
  start() {
    return { message: 'Here is the HTML page only when you are auhtorized!' };
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @UseGuards(AuthGuard('local'))
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
