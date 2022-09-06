import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestError extends HttpException {
  constructor(error: Error) {
    super(error, HttpStatus.BAD_REQUEST);
  }
}
