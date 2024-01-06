import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';
import { UserRepository } from './repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserRepository])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
