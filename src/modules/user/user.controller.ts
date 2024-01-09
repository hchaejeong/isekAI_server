import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UpdateProfileRequestDto } from './dtos/update-profile-request.dto';
import { Request } from 'express';
import { UserEntity } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetAllUserInfoResponseDto } from './dtos/get-all-user-info-response.dto';
import { AddSeriesToUserRequestDto } from './dtos/add-series-to-user-request.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('update-profile')
  async updateProfile(@Req() req: Request, @Body() body: UpdateProfileRequestDto) {
    const { user } = req;
    const { email, name, profileIconUrl } = body;

    if (!user) {
      throw new UnauthorizedException();
    }

    const response = await this.userService.updateProfile({ email, name, profileIconUrl });

    return response;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getMySeries(@Param('id', new ParseUUIDPipe()) id : string, @Req() req: Request) {
    const user: UserEntity = req.user as UserEntity;

    if (!user || user.id !== id) {
      throw new UnauthorizedException();
    }

    return await this.userService.getMySeries({ id });
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/series')
  async addSeriesToUser(@Req() req: Request, @Body() body: AddSeriesToUserRequestDto) {
    const user: UserEntity = req.user as UserEntity;
    const { selectedSeriesIds } = body;

    const finalUser = await this.userService.addSeriesToUsers({ id: user.id, seriesIds: selectedSeriesIds });

    return finalUser.series;
  }
}
