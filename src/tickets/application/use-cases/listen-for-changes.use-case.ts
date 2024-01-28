import { Injectable } from '@nestjs/common';
import { DBUseCase } from './db.use-case';
import { WebSocketsUseCase } from './websocket.use-case';

@Injectable()
export class ListenForChangesUseCase {
  constructor(
    private readonly db: DBUseCase,
    private readonly wss: WebSocketsUseCase,
  ) {}
}
