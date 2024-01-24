import { Controller, Post } from '@nestjs/common';
import { EnrollmentUseCase } from '@auth/application/use-cases/enrollment.use-case';

@Controller('auth')
export class EnrollmentController {
  constructor(private readonly useCase: EnrollmentUseCase) {}

  @Post('enrollment')
  run() {
    return this.useCase.apply();
  }
}
