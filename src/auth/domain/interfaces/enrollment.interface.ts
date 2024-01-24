import { Role } from '@auth/domain/enums/role.enum';

export interface IEnrollment {
  _id: any;
  fullName: string;
  email: string;
  password: string;
  role: Role;
  hasAccess: boolean;
  online: boolean;
}
