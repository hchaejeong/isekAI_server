import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { SeriesEntity } from '@src/modules/series/entities/series.entity';
import { UserEntity } from '../entities/user.entity';
import { JwtPayloadType } from '@src/utils/types/jwt-payload.type';

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

    public async addSeriesToUsers(args: { id: string, seriesIds: string[] }): Promise<UserEntity> {
      const { id, seriesIds } = args;

      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        throw new UnauthorizedException();
      }

      const updatedUser = await this.userRepository.update(id, { series: [...(user.series || []), ...seriesIds.map(id => ({ id }))] });
      return this.userRepository.findOne({ where: { id }});
    }

    async findMe(args?: JwtPayloadType): Promise<{ user: UserEntity | null }> {
      if (!args) {
        return {
          user: null,
        };
      }

      const { id } = args;
      const user = await this.userRepository.findOne({
        where: {
          id,
        },
      });

      return { user };
    }
}
