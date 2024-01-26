import { BadRequestException, Injectable } from '@nestjs/common';
import { DBUseCase } from './db.use-case';
import { IQueueTicket } from '@tickets/domain/interfaces/queue-tickets.interface';
import { Step } from '@tickets/domain/enums/status.enum';

@Injectable()
export class CreateTicketUseCase {
  constructor(private readonly db: DBUseCase) {}

  async apply() {
    try {
      const latestTicket = await this.db.findByLatestInsert();
      const consecutive = latestTicket?.[0]?.consecutive
        ? latestTicket?.[0]?.consecutive + 1
        : 1;

      const dataToInsert: IQueueTicket = {
        consecutive: consecutive,
        ticket: `TICKET#${consecutive}`,
        step: Step.START,
      };
      console.log({ dataToInsert });

      return await this.db.insert(dataToInsert);
    } catch (error) {
      throw new BadRequestException('Ocurrio un error al crear el ticket');
    }
  }
}
