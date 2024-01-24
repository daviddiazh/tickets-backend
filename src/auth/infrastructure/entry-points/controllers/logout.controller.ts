import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { Types } from 'mongoose';
import { LogoutUseCase } from '@auth/application/use-cases/logout.use-case';
import { ParseObjectIdPipe } from '@shared/pipes/parse-object-id.pipe';
import { AuthenticationGuard } from '../guards/auth.guard';

@Controller('auth')
export class LogoutController {
  constructor(private readonly useCase: LogoutUseCase) {}

  @Post('logout/:_id')
  @UseGuards(AuthenticationGuard)
  run(@Param('_id', ParseObjectIdPipe) _id: Types.ObjectId) {
    return this.useCase.apply(_id);
  }
}
