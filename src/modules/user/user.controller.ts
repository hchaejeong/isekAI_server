import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UpdateProfileRequestDto } from './dtos/update-profile-request.dto';
import { Request } from 'express';
import { UserEntity } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('google'))
  @Post('update-profile')
  async updateProfile(@Body() body: UpdateProfileRequestDto) {
    const { email, name, profileIconUrl } = body;

    const response = await this.userService.updateProfile({ email, name, profileIconUrl });

    return response;
  }

  @UseGuards(AuthGuard('google'))
  @Get(':id')
  async getMySeries(@Param('id', new ParseUUIDPipe()) id : string, @Req() req: Request) {
    const user: UserEntity = req.user as UserEntity;

    if (!user || user.id !== id) {
      throw new UnauthorizedException();
    }

    return this.userService.getMySeries({ id });
  }
}
