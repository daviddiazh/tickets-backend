import { Module } from '@nestjs/common';
import { WebsocketsGateway } from './gateway';
import { WebsocketsAdapter } from './service';

@Module({
  imports: [],
  providers: [WebsocketsGateway, WebsocketsAdapter],
  exports: [WebsocketsGateway, WebsocketsAdapter],
})
export class WebsocketsModule {}
