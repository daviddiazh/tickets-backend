import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IQueueTicket } from '@tickets/domain/interfaces/queue-tickets.interface';
import { TicketSpec } from './schema';

@Injectable()
export class TicketsMongoDBRepository {
  constructor(@InjectModel('Ticket') private authModel: Model<TicketSpec>) {}

  async insert(payload: IQueueTicket): Promise<IQueueTicket> {
    try {
      await new this.authModel(payload).save();

      return payload;
    } catch (error) {
        console.log({error})
      throw new BadRequestException(
        'Error al crear el ticket por favor intente más tarde',
      );
    }
  }

  async findByLatestInsert(): Promise<any> {
    try {
      const user = await this.authModel.find().sort({ $natural: -1 }).limit(1);

      return user;
    } catch (error) {
      throw new NotFoundException(
        'No se encontró ningún ticket ó ocurrio un error',
      );
    }
  }
}
