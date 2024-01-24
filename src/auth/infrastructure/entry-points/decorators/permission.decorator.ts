import { SetMetadata } from '@nestjs/common';

export const PermitedRoles = (...roles: string[]) =>
  SetMetadata('roles', roles);
