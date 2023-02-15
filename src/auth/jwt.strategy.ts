import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(payload: any, done: VerifiedCallback) {
    const nguoi_dung = await this.authService.validateUser(payload);
    if (!nguoi_dung) {
      return done(new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED));
    }
    return done(null, nguoi_dung, payload.iat);
  }
}
