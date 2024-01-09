import { UserEntity } from "../entities/user.entity";

export class FindMeResponseDto {
  user: UserEntity | null;
}
