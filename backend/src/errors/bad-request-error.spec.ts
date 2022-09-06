import { BadRequestError } from './bad-request-error';

describe('BadRequestError', () => {
  it('should be defined', () => {
    expect(new BadRequestError(new Error('test'))).toBeDefined();
  });
});
