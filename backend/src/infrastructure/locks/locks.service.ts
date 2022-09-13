import { Injectable } from '@nestjs/common';
import { LockInfo } from './lock-info';
import { Lock } from './lock';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class LocksService {
  private locks = new Set<Lock>();
  private locksInfo = new Map<string, LockInfo>();
  private timerId = null;

  //5 minutes
  private lockLiveTime = 5 * 60 * 1000;
  // 5 seconds
  private outdatedLocksCollectionInterval = 5 * 1000;

  constructor(private eventEmitter: EventEmitter2) {}

  public start(): void {
    this.timerId = setInterval(
      this.unlockOutdatedLocks,
      this.outdatedLocksCollectionInterval,
    );
  }

  public stop(): void {
    if (!!this.timerId) {
      clearInterval(this.timerId);
    }
  }

  public lock(user: string, table: string, recordId: number): boolean {
    const lock = new Lock(table, recordId);
    if (!this.isLocked(lock)) {
      const lockInfo = new LockInfo(user, lock);
      this.locks.add(lock);
      this.locksInfo.set(lockInfo.id, lockInfo);
      this.eventEmitter.emit('locked', lockInfo);
      return true;
    }
    return false;
  }

  public unlock(user: string, table: string, recordId: number): boolean {
    const lock = new Lock(table, recordId);
    if (this.locks.delete(lock)) {
      const lockInfo = new LockInfo(user, lock);
      this.locksInfo.delete(lockInfo.id);
      this.eventEmitter.emit('unlocked', lockInfo);
    }
    return true;
  }

  public unlockByUserLock(user: string, lock: Lock): boolean {
    return this.unlock(user, lock.table, lock.recordId);
  }

  public unlockByLockInfo(lockInfo: LockInfo): boolean {
    return this.unlockByUserLock(lockInfo.user, lockInfo.lock);
  }

  public isLocked(lock: Lock): boolean {
    return this.locks.has(lock);
  }

  public unlockOutdatedLocks(): void {
    const now = new Date().getTime();
    for (const key of this.locksInfo.keys()) {
      if (this.locksInfo.has(key)) {
        const lockInfo = this.locksInfo.get(key);
        if (now - lockInfo.createdAt > this.lockLiveTime) {
          this.unlockByLockInfo(lockInfo);
        }
      }
    }
  }
}
