import {
  ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus,
} from '@nestjs/common';

@Catch()
class HttpExceptionFilter implements ExceptionFilter {
  // eslint-disable-next-line
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response
      .status(status)
      .send({
        code: exception?.response?.code || 666,
        error: exception?.response?.error || 'unknown error',
        message: exception?.response?.message || 'Failure',
      });
  }
}

export default HttpExceptionFilter;
