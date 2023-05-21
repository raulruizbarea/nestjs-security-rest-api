import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { EnvironmentVariables } from '../../config/env.variables';

require('dotenv').config({
  path: `./apps/api-gateway/src/environments/.env.${process.env.NODE_ENV}`,
});

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${configService.get('auth0.issuerUrl', {
          infer: true,
        })}.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: configService.get('auth0.audience', { infer: true }),
      issuer: configService.get('auth0.issuerUrl', { infer: true }),
      algorithms: ['RS256'],
    });
  }

  async validate(payload: any): Promise<any> {
    if (!payload) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    return payload;
  }
}
