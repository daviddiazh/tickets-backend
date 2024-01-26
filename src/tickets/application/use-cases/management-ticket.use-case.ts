import { BadRequestException, Injectable } from '@nestjs/common';
import { DBUseCase } from './db.use-case';

@Injectable()
export class ManagementTicketUseCase {
  constructor(private readonly db: DBUseCase) {}

  async apply(where: any) {
    try {
      //   const currentTicket = await this.db.findOne({ consecutive: where?.consecutive });
    } catch (error) {
      throw new BadRequestException('');
    }
  }
}
