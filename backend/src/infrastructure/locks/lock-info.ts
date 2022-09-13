import { Lock } from './lock';

export class LockInfo {
  public id: string;
  public user: string;
  public lock: Lock;
  public createdAt: number;

  public static getLockInfoId(user: string, lock: Lock): string {
    return `${user}-${lock}`;
  }

  constructor(user: string, lock: Lock) {
    this.id = LockInfo.getLockInfoId(user, lock);
    this.user = user;
    this.lock = lock;
    this.createdAt = new Date().getTime();
  }

  toString(): string {
    return this.id;
  }
}
