// eslint-disable-next-line max-classes-per-file
import { HttpException, HttpStatus } from '@nestjs/common';
import { EXAMPLE_NOT_FOUND, EXTERNAL_SERVICE_CALLER, INVALID_OBJECT_ID } from '../constants/errors';

export class ExampleNotFoundException extends HttpException {
  constructor() {
    super(EXAMPLE_NOT_FOUND, HttpStatus.BAD_REQUEST);
  }
}

export class InvalidMongoIdException extends HttpException {
  constructor() {
    super(INVALID_OBJECT_ID, HttpStatus.BAD_REQUEST);
  }
}

export class GenericExternalServiceError extends HttpException {
  constructor(serviceName = 'unknown', error: string) {
    super(EXTERNAL_SERVICE_CALLER(serviceName, error), HttpStatus.BAD_REQUEST);
  }
}
