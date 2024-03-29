import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { parseBoolean } from '@shared/pipes/parse-boolean.pipe';
import { IEnrollment } from '@auth/domain/interfaces/enrollment.interface';

export class EnrollmentDto implements IEnrollment {
  @IsNotEmpty({
    message: 'El nombre es obligatorio',
  })
  @IsString({
    message: 'El nombre debe ser un texto',
  })
  fullName: string;

  @IsNotEmpty({
    message: 'El correo electrónico es obligatorio',
  })
  @IsString({
    message: 'El correo electrónico debe ser un texto',
  })
  email: string;

  @IsNotEmpty({
    message: 'La contraseña es obligatoria',
  })
  @IsString({
    message: 'La contraseña debe ser un texto',
  })
  password: string;

  @IsNotEmpty({
    message: 'El número del escritorio es obligatorio',
  })
  @IsNumber()
  desk: number;

  @Transform(parseBoolean)
  @IsBoolean({ message: 'Por favor, verifica el estado online' })
  online?: boolean;
}
