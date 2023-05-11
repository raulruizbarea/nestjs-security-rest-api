import * as jwt from 'jsonwebtoken';

import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { UserDto } from '../dto/user.dto';

export const AuthUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const token = req.headers.authorization.split(' ')[1];
  const tokenInfo: any = jwt.decode(token);
  const userDto: UserDto = new UserDto();
  userDto.email = tokenInfo['https://nestjs-security-rest-api/email'];
  userDto.roles = tokenInfo['https://nestjs-security-rest-api/roles'];
  userDto.userId = tokenInfo.sub;
  return userDto;
});
