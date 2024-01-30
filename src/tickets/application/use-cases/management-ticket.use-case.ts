import { BadRequestException, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Step } from '@tickets/domain/enums/status.enum';
import { DBUseCase } from './db.use-case';
import { IQueueTicket } from '@tickets/domain/interfaces/queue-tickets.interface';
import { FindTicketsOnManagementUseCase } from './find-tickets-on-management.use-case';

@Injectable()
export class ManagementTicketUseCase {
  constructor(
    private readonly db: DBUseCase,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async apply(payload: any) {
    try {
      // if (payload?.currentTicketID !== 'null') {
      //   const currentTicket = await this.db.findById(payload?.currentTicketID);

      //   if (`${payload?.userId}` == `${currentTicket?.managementBy?._id}`) {
      //     await this.db.update(payload?.currentTicketID, { step: Step.ENDED });
      //   }
      // }

      // const ticketToManagement: IQueueTicket = await this.db.findOne({
      //   step: Step.START,
      // });

      // if (ticketToManagement?.[0]?._id) {
      //   const updateTicket = await this.db.update(
      //     ticketToManagement?.[0]?._id,
      //     {
      //       step: Step.MANAGEMENT,
      //       managementBy: payload?.userId,
      //     },
      //   );

      //   this.eventEmitter.emit('ticket.management', null);

      //   return { next: updateTicket };
      // }

      const tickets = await this.db.find({ step: Step.MANAGEMENT });
      this.eventEmitter.emit('ticket.management', tickets);

      return { next: null };
    } catch (error) {
      console.log({ error });
      throw new BadRequestException(
        'Ocurrio un error al darle manejo a los tickets',
      );
    }
  }
}
