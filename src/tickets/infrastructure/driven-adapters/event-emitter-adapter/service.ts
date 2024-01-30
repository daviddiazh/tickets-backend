import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { WebsocketsAdapter } from '../websockets-adapter/service';
import { WebsocketsGateway } from '../websockets-adapter/gateway';

@Injectable()
export class EventEmitterAdapter {
  constructor(private readonly websocketAdapter: WebsocketsGateway) {}

  @OnEvent('ticket.management')
  async handleOrderCreatedEvent(payload: any[]) {
    try {
      return await this.websocketAdapter.emit('tickets-on-management', payload);
    } catch (error) {
      console.log({ error })
    }
  }
}
