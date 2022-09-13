export class Lock {
  public id: string;
  public table: string;
  public recordId: number;

  public static getLockId(table: string, recordId: number): string {
    return `${table}-${recordId}`;
  }

  constructor(table: string, recordId: number) {
    this.id = Lock.getLockId(table, recordId);
    this.table = table;
    this.recordId = recordId;
  }

  equal(lock: Lock): boolean {
    return this.table === lock.table && this.recordId === lock.recordId;
  }

  toString(): string {
    return this.id;
  }
}
