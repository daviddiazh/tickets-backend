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
  constructor(@InjectModel('Ticket') private ticketModel: Model<TicketSpec>) {}

  async insert(payload: IQueueTicket): Promise<IQueueTicket> {
    try {
      await new this.ticketModel(payload).save();

      return payload;
    } catch (error) {
      console.log({ error });
      throw new BadRequestException(
        'Error al crear el ticket por favor intente más tarde',
      );
    }
  }

  async find(where: any): Promise<any> {
    try {
      return await this.ticketModel.find(where).populate('managementBy');
    } catch (error) {
      throw new BadRequestException(
        'Parece que hubo un error al encontrar los tickets',
      );
    }
  }

  async findByLatestInsert(): Promise<any> {
    try {
      const user = await this.ticketModel
        .find()
        .sort({ $natural: -1 })
        .limit(1);

      return user;
    } catch (error) {
      throw new NotFoundException(
        'No se encontró ningún ticket ó ocurrio un error',
      );
    }
  }

  async findOne(where: any): Promise<any> {
    try {
      const ticket = await this.ticketModel
        .find(where)
        .sort({ ['consecutive']: 'asc' })
        .limit(1)
        .exec();

      return ticket;
    } catch (error) {
      throw new NotFoundException(
        'No se encontró ningún ticket por ese filtro',
      );
    }
  }

  async update(where: any, payload: any): Promise<TicketSpec> {
    try {
      const user: any = await this.ticketModel.findByIdAndUpdate(
        where,
        payload,
        {
          new: true,
        },
      );
      return user;
    } catch (error) {
      throw new NotFoundException('No se encontró ningún ticket por el ID');
    }
  }
}
