import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayloadType } from '@src/utils/types/jwt-payload.type';
import { OauthService } from '../oauth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly oauthService: OauthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret',
    });
  }

  public validate(payload: JwtPayloadType): JwtPayloadType {
    const { id } = payload;

    if (!id) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
