import { NotFoundError } from './not-found-error';

describe('NotFoundError', () => {
  it('should be defined', () => {
    expect(new NotFoundError(new Error('test'))).toBeDefined();
  });
});
