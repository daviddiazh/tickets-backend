import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateTicketUseCase } from '@tickets/application/use-cases/create-ticket.use-case';
import { DBUseCase } from '@tickets/application/use-cases/db.use-case';
import { TicketSchema } from './driven-adapters/mongodb-adaper/schema';
import { TicketsMongoDBRepository } from './driven-adapters/mongodb-adaper/repository';
import { CreateTicketController } from './entry-points/controllers/create-ticket.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Ticket', schema: TicketSchema }]),
  ],
  providers: [
    TicketsMongoDBRepository,

    {
      inject: [TicketsMongoDBRepository],
      provide: CreateTicketUseCase,
      useFactory: (dbAdapter: DBUseCase) => new CreateTicketUseCase(dbAdapter),
    },
  ],
  controllers: [CreateTicketController],
})
export class TicketsModule {}
