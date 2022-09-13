import { LockInfo } from './lock-info';
import { Lock } from './lock';

describe('Lock', () => {
  it('should be defined', () => {
    const lock = new Lock('table', 0);
    expect(new LockInfo('ussr', lock)).toBeDefined();
  });
});
