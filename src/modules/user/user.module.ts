import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';
import { UserRepository } from './repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { SeriesEntity } from '../series/entities/series.entity';
import { SeriesRepository } from '../series/repositories/series.repository';
import { GetUserHandler } from './queries/handlers/get-user.handler';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, SeriesEntity]), CqrsModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, GetUserHandler],
  exports: [UserService],
})
export class UserModule {}
