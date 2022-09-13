import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { LocksService } from '../../locks/locks.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class LocksGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly locksService: LocksService) {}

  @SubscribeMessage('lock')
  lock(@MessageBody() data: any): boolean {
    const { user, table, recordId } = data;
    return this.locksService.lock(user, table, recordId);
  }

  @SubscribeMessage('unlock')
  unlock(@MessageBody() data: any): boolean {
    const { user, table, recordId } = data;
    return this.locksService.unlock(user, table, recordId);
  }
}
