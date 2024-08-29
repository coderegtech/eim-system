import {
  Body,
  Controller,
  Post,
  Req,
  Response,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Body() authDto: CreateAuthDto, @Req() req: Request) {
    return req.user;
  }

  @Post('signup')
  signup(@Body() createAuthDto: CreateAuthDto, @Response() res) {
    return this.authService.createUser(createAuthDto, res);
  }
}
