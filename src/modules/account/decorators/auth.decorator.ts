import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

import { IJWTPayload } from '../types/interface/jwtPayload';

export const Auth = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): Partial<IJWTPayload> => {
    try {
      const { user } = ctx.switchToHttp().getRequest();

      return user;
    } catch (error) {
      throw new ForbiddenException();
    }
  },
);
