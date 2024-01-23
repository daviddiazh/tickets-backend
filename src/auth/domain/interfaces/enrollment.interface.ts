import { Role } from '../enums/role.enum';

export interface ILogin {
  _id: any;
  fullName: string;
  email: string;
  password: string;
  role: Role;
  hasAccess: boolean;
  online: boolean;
}
