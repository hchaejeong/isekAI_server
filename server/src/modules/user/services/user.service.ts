import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}

    public async updateProfile(args: { email: string; name: string; profileIconUrl?: string }): Promise<string> {
        const { email, name, profileIconUrl } = args;

        const user = await this.userRepository.findOne({
          where: {
            email,
          }
        });

        if (!user) {
          throw new UnauthorizedException();
        }
    
        await this.userRepository.update(user.id, {
          name,
          profileIconUrl,
        });
    
        return 'your profile has been updated';
      }
}
