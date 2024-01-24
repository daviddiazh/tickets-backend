import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthenticationGuard extends AuthGuard('jwt') {
  handleRequest(error: any, user: any) {
    if (error) throw error;
    if (!user) throw new UnauthorizedException('Parece que expiró su sesión');

    return user;
  }
}
