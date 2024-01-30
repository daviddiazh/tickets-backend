import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateTicketUseCase } from '@tickets/application/use-cases/create-ticket.use-case';
import { DBUseCase } from '@tickets/application/use-cases/db.use-case';
import { TicketSchema } from './driven-adapters/mongodb-adaper/schema';
import { TicketsMongoDBRepository } from './driven-adapters/mongodb-adaper/repository';
import { CreateTicketController } from './entry-points/controllers/create-ticket.controller';
import { ManagementTicketUseCase } from '@tickets/application/use-cases/management-ticket.use-case';
import { ManagementTicketController } from './entry-points/controllers/management-ticket.controller';
import { FindTicketsOnManagementUseCase } from '@tickets/application/use-cases/find-tickets-on-management.use-case';
import { FindTicketsOnManagementController } from './entry-points/controllers/find-tickets-on-management.controller';
import { WebSocketsUseCase } from '@tickets/application/use-cases/websocket.use-case';
import { ListenForChangesUseCase } from '@tickets/application/use-cases/listen-for-changes.use-case';
import { WebsocketsGateway } from './driven-adapters/websockets-adapter/gateway';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { EventEmitterAdapter } from './driven-adapters/event-emitter-adapter/service';
import { WebsocketsAdapter } from './driven-adapters/websockets-adapter/service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Ticket', schema: TicketSchema }]),
    // WebsocketsModule,

    EventEmitterModule.forRoot(),
  ],
  providers: [
    TicketsMongoDBRepository,
    WebsocketsGateway,
    WebsocketsAdapter,

    {
      inject: [TicketsMongoDBRepository],
      provide: CreateTicketUseCase,
      useFactory: (dbAdapter: DBUseCase) => new CreateTicketUseCase(dbAdapter),
    },
    {
      inject: [TicketsMongoDBRepository, EventEmitter2],
      provide: ManagementTicketUseCase,
      useFactory: (dbAdapter: DBUseCase, eventEmitter: EventEmitter2) => {
        return new ManagementTicketUseCase(dbAdapter, eventEmitter);
      },
    },
    {
      inject: [TicketsMongoDBRepository],
      provide: FindTicketsOnManagementUseCase,
      useFactory: (dbAdapter: DBUseCase) => {
        return new FindTicketsOnManagementUseCase(dbAdapter);
      },
    },
    {
      inject: [TicketsMongoDBRepository, WebsocketsGateway],
      provide: ListenForChangesUseCase,
      useFactory: (
        dbAdapter: DBUseCase,
        websocketAdapter: WebSocketsUseCase,
      ) => {
        return new ListenForChangesUseCase(dbAdapter, websocketAdapter);
      },
    },
    {
      inject: [WebsocketsGateway, EventEmitter2],
      provide: EventEmitterAdapter,
      useFactory: (websocketAdapter: WebsocketsGateway) => {
        return new EventEmitterAdapter(websocketAdapter);
      },
    },
  ],
  controllers: [
    CreateTicketController,
    ManagementTicketController,
    FindTicketsOnManagementController,
  ],
})
export class TicketsModule {}
