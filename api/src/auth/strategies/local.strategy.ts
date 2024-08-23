import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    console.log('Inside LocalStrategy');
    const user = await this.authService.validateUser({ username, password });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
