import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}

    public async updateProfile(args: { id: string; name: string; profileIconUrl?: string }): Promise<string> {
        const { id, name, profileIconUrl } = args;
    
        await this.userRepository.update(id, {
          name,
          profileIconUrl,
        });
    
        return 'your profile has been updated';
      }
}
