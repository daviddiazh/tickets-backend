import { Controller, Get } from '@nestjs/common';
import { FindTicketsOnManagementUseCase } from '@tickets/application/use-cases/find-tickets-on-management.use-case';

@Controller('tickets')
export class FindTicketsOnManagementController {
  constructor(private readonly useCase: FindTicketsOnManagementUseCase) {}

  @Get()
  run() {
    return this.useCase.apply();
  }
}
