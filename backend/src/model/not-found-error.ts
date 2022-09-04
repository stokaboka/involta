import {HttpException, HttpStatus} from "@nestjs/common";

export class NotFoundError extends  HttpException{
    constructor(error: Error) {
        super(error, HttpStatus.NOT_FOUND);
    }
}
