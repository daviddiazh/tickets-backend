import { Injectable } from '@nestjs/common';
import { IWebsocket } from '@tickets/domain/interfaces/websocket.interface';

@Injectable()
export class WebSocketsUseCase implements IWebsocket {
  constructor(private readonly websocket: IWebsocket) {}

  async emit(event: string, toReturn: any) {
    return await this.websocket.emit(event, toReturn);
  }

  async on(event: string, toReturn: any) {
    return await this.websocket.on(event, toReturn);
  }
}
