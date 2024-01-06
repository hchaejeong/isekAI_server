import { Module } from '@nestjs/common';
import { OauthService } from './oauth.service';
import { OauthController } from './oauth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { GoogleStrategy } from './strategy/google.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserRepository } from '../user/repository/user.repository';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'google' }), TypeOrmModule.forFeature([UserEntity])],
  controllers: [OauthController],
  providers: [OauthService, GoogleStrategy, UserRepository],
})
export class OauthModule {}
