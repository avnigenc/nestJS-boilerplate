import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles: string[] = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    // TODO: add logic
    const user = {
      role: 'admin',
    };

    if (this.checkRole(roles, user.role)) {
      return true;
    }

    throw new HttpException(
      {
        message: 'not authorized',
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  checkRole(roles: string[], userRole: string) {
    return roles.includes(userRole);
  }
}
