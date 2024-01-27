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

      const words = ['TI', 'CK', 'ET', 'SS'];

      const nRandom = Math.floor(Math.random() * 4);
      const randomWord = words[nRandom];

      const dataToInsert: IQueueTicket = {
        consecutive: consecutive,
        ticket: `${randomWord}${consecutive}`,
        step: Step.START,
      };

      return await this.db.insert(dataToInsert);
    } catch (error) {
      throw new BadRequestException('Ocurrio un error al crear el ticket');
    }
  }
}
