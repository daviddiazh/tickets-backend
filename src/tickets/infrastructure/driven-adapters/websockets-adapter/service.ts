import { Injectable } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@Injectable()
export class WebsocketsAdapter {
  @WebSocketServer() websocket: Server;

  async emit(event: string, payload: any) {
    return await this.websocket.to('tickets').emit(event, payload);
  }

  async on(event: string, payload: any) {
    return await this.websocket.on(event, payload);
  }
}
