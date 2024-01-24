import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ILogin } from '@auth/domain/interfaces/login.interface';

export class LoginDto implements ILogin {
  @IsNotEmpty({
    message: 'El correo electrónico es obligatorio',
  })
  @IsString({
    message: 'El correo electrónico debe ser un texto',
  })
  @IsEmail()
  email: string;

  @IsString({
    message: 'La contraseña debe ser un texto',
  })
  @MinLength(8, {
    message: 'La contraseña debe contener al menos 8 dígitos',
  })
  password: string;
}
