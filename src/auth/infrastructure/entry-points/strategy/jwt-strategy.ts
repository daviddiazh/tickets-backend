import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DBUseCase } from '@auth/application/use-cases/db.use-case';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly dbUseCase: DBUseCase) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any): Promise<any> {
    const { _id } = payload;

    const user = await this.dbUseCase.findById(_id);

    if (!user) throw new UnauthorizedException('El Token no es válido');

    return user;
  }
}
