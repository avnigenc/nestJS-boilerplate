import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class PublicGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private jwtService: JwtService,
  ) { }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<string[]>('public', context.getHandler());

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { headers } = request;

    // TODO: refactor logic
    try {
      if (!headers.authorization) throw Error('token not found!');
      const {
        token,
      } = headers.authorization.split(' ')[1];
      if (!this.isTokenExpired(token)) throw Error('token expired!');
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
    request.user = {};
    return true;
  }

  isTokenExpired(token: string) {
    const tokenData = this.jwtService.decode(token) as {
      exp: number;
      userId: any;
    };

    if (tokenData.exp <= Math.floor(+new Date() / 1000)) {
      return false;
    }

    return true;
  }
}
