import { BadRequestException, Injectable } from '@nestjs/common';
import { Step } from '@tickets/domain/enums/status.enum';
import { DBUseCase } from './db.use-case';
import { IQueueTicket } from '@tickets/domain/interfaces/queue-tickets.interface';

@Injectable()
export class ManagementTicketUseCase {
  constructor(private readonly db: DBUseCase) {}

  async apply(payload: any) {
    try {
      if (payload?.currentTicketID !== 'null') {
        await this.db.update(payload?.currentTicketID, { step: Step.ENDED });
      }

      const ticketToManagement: IQueueTicket = await this.db.findOne({
        step: Step.START,
      });

      if (ticketToManagement?.[0]?._id) {
        const updateTicket = await this.db.update(
          ticketToManagement?.[0]?._id,
          {
            step: Step.MANAGEMENT,
            managementBy: payload?.userId,
          },
        );

        return { next: updateTicket };
      }

      return { next: null };
    } catch (error) {
      throw new BadRequestException(
        'Ocurrio un error al darle manejo a los tickets',
      );
    }
  }
}
