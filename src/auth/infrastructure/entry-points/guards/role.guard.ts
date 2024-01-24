import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const routeRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    const user = context.getArgs()[0].user;

    if (!user.hasAccess) {
      return false;
    }

    const userRoles = user.role;
    if (!routeRoles) {
      return true;
    }

    const hasRole = () =>
      routeRoles?.some((routeRole) => userRoles?.includes(routeRole));

    return hasRole();
  }
}
