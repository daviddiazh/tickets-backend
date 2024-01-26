import { Controller, Post } from '@nestjs/common';
import { CreateTicketUseCase } from '@tickets/application/use-cases/create-ticket.use-case';

@Controller('tickets')
export class CreateTicketController {
  constructor(private readonly useCase: CreateTicketUseCase) {}

  @Post()
  run() {
    return this.useCase.apply();
  }
}
