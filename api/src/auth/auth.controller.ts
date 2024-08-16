import { Body, Controller, Post, Response, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Body() authDto: CreateAuthDto, @Response() res) {
    return this.authService.login(authDto, res);
  }

  @Post('signup')
  signup(@Body() createAuthDto: CreateAuthDto, @Response() res) {
    return this.authService.createUser(createAuthDto, res);
  }
}
