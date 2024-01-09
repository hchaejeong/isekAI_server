import { UserEntity } from '/root/server/src/modules/user/entities/user.entity';

export type JwtPayloadType = Pick<UserEntity, 'id' | 'email'> & {
  iat: number;
  exp: number;
};
