import { Body, Controller, Post } from '@nestjs/common';
import { EnrollmentUseCase } from '@auth/application/use-cases/enrollment.use-case';

@Controller('auth')
export class EnrollmentController {
  constructor(private readonly useCase: EnrollmentUseCase) {}

  @Post('enrollment')
  run(@Body() payload: any) {
    return this.useCase.apply(payload);
  }
}
