import { Module } from '@nestjs/common';
import { OauthService } from './oauth.service';
import { OauthController } from './oauth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { GoogleStrategy } from './strategy/google.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserRepository } from '../user/repository/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'google' }), 
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '24h'},
    }),
    TypeOrmModule.forFeature([UserEntity])],
  controllers: [OauthController],
  providers: [OauthService, JwtStrategy, GoogleStrategy, UserRepository, { provide: 'GOOGLE_CLIENT_ID', useValue: process.env.OAUTH_GOOGLE_ID }],
  exports: [OauthService],
})
export class OauthModule {}
