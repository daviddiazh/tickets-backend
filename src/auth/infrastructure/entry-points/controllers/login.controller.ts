import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LoginUseCase } from '@auth/application/use-cases/login.use-case';
import { LoginDto } from '../dtos/login.dto';
import { PermitedRoles } from '../decorators/permission.decorator';
import { AuthenticationGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';

@Controller('auth')
export class LoginController {
  constructor(private readonly useCase: LoginUseCase) {}

  @Post('login')
  run(@Body() payload: LoginDto) {
    return this.useCase.apply(payload);
  }

  @Get()
  @UseGuards(AuthenticationGuard, RoleGuard)
  @PermitedRoles('ADMIN')
  test() {
    return 'privare resource';
  }
}
