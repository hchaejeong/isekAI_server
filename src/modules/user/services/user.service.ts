import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { SeriesEntity } from '@src/modules/series/entities/series.entity';

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
    
    public async getMySeries(args: { id: string }): Promise<SeriesEntity[]> {
      const { id } = args;

      const user = await this.userRepository.findOne({
        where: {
          id,
        },
        relations: ['series'],
      });

      if (!user) {
        throw new UnauthorizedException();
      }

      return user.series || [];
    }
}
