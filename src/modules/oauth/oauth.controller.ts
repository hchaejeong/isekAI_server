import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { OauthService } from './oauth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class OauthController {
  constructor(private readonly oauthService: OauthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {}

  @Post('google/verify')
  async signInWithGoogle(@Body() { idToken }: { idToken: string }) {
    // Validate the Google ID token and extract user information
    const userInfo = await this.oauthService.validateGoogleIdToken(idToken);

    // Process user information as needed
    console.log(userInfo);

    return userInfo;
  }

}
