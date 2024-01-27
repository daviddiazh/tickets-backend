import { Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from '@auth/infrastructure/entry-points/guards/auth.guard';
import { ManagementTicketUseCase } from '@tickets/application/use-cases/management-ticket.use-case';

@Controller('tickets')
export class ManagementTicketController {
  constructor(private readonly useCase: ManagementTicketUseCase) {}

  @Post('management/:currentTicketID')
  @UseGuards(AuthenticationGuard)
  run(
    @Param('currentTicketID')
    currentTicketID: any,
    @Req() req,
  ) {
    return this.useCase.apply({ currentTicketID, userId: req?.user?._id });
  }
}
