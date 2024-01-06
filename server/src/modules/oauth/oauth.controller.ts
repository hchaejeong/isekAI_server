import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { OauthService } from './oauth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class OauthController {
  constructor(private readonly oauthService: OauthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req) {
    const { email, firstName, lastName, profileIcon, accessToken } = req.user;
    
    return this.oauthService.validateGoogleLogin(email, firstName, lastName, profileIcon, accessToken);
  }

}
