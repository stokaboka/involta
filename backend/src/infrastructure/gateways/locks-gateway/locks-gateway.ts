import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { OnEvent } from '@nestjs/event-emitter';
import { Server } from 'socket.io';
import { LocksService } from '../../locks/locks.service';
import { LockInfo } from '../../locks/lock-info';

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

  @OnEvent('locked')
  onLocked(payload: LockInfo) {
    this.server.emit('locked', payload);
  }

  @OnEvent('unlocked')
  onUnLocked(payload: LockInfo) {
    this.server.emit('unlocked', payload);
  }
}
