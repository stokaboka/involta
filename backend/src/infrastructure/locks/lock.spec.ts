import { Lock } from './lock';

describe('Lock', () => {
  it('should be defined', () => {
    expect(new Lock('user', 0)).toBeDefined();
  });
});
