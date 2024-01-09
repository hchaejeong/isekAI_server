import { Body, Controller, Post, Req, UnauthorizedException } from '@nestjs/common';
import { UserService } from './services/user.service';
import { Request } from 'express';
import { UpdateProfileRequestDto } from './dtos/update-profile-request.dto';
import { UserEntity } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('update-profile')
  async updateProfile(@Body() body: UpdateProfileRequestDto) {
    const { email, name, profileIconUrl } = body;

    const response = await this.userService.updateProfile({ email, name, profileIconUrl });

    return response;
  }
}
