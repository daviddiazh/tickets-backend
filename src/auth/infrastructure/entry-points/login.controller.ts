import { LoginUseCase } from '@auth/application/use-cases/login.use-case';
import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class LoginController {
  constructor(private readonly useCase: LoginUseCase) {}

  @Post('login')
  async run() {
    return await this.useCase.run();
  }
}
