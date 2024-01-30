import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { FindTicketsOnManagementUseCase } from '@tickets/application/use-cases/find-tickets-on-management.use-case';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true, namespace: 'tickets' })
export class WebsocketsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  constructor(private readonly useCase: FindTicketsOnManagementUseCase) {}

  async handleConnection(client: Socket, ...args: any[]) {
    console.log('Cliente conectado: ', client.id);

    const tickets = await this.useCase.apply();

    this.wss.emit('tickets-on-connection', tickets);
  }

  handleDisconnect(client: Socket) {
    console.log('Cliente desconectado: ', client.id);
  }

  async managementTickets() {
    // const tickets = await this.useCase.apply();
    // this.wss.emit('tickets-on-management', tickets);
  }

  async emit(event: string, payload: any) {
    return await this.wss.emit(event, payload);
  }

  async on(event: string, payload: any) {
    return await this.wss.on(event, payload);
  }
}
