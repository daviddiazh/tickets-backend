import { Body, Controller, Post } from '@nestjs/common';
import { LoginUseCase } from '@auth/application/use-cases/login.use-case';
import { LoginDto } from '../dtos/login.dto';

@Controller('auth')
export class LoginController {
  constructor(private readonly useCase: LoginUseCase) {}

  @Post('login')
  run(@Body() payload: LoginDto) {
    return this.useCase.apply(payload);
  }
}
