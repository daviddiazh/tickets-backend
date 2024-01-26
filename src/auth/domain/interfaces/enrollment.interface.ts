export interface IEnrollment {
  _id?: any;
  fullName: string;
  email: string;
  password: string;
  desk: number;
  online?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
