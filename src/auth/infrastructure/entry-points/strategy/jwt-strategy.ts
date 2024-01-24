import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DBUseCase } from '@auth/application/use-cases/db.use-case';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly dbUseCase: DBUseCase,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async run(payload: any): Promise<any> {
    const { _id } = payload;

    const user = await this.dbUseCase.findById(_id);

    if (!user) throw new UnauthorizedException('El Token no es válido');

    return user;
  }
}
