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

  /*
  @UseGuards(AuthGuard('google'))
  @Post('google/verify')
  async signInWithGoogle(@Body() { idToken }: { idToken: string }) {
    // Validate the Google ID token and extract user information
    const userInfo = await this.oauthService.validateGoogleIdToken(idToken);

    // Process user information as needed
    console.log(userInfo);

    return userInfo;
  }
  */

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req, @Res() res) {
    console.log(req.user);
    const jwt: string = req.user.jwtToken;
    if (jwt) {
      res.status(200).json({ jwtToken: jwt });
    } else {
      res.status(500).json({ error: 'Login failed' });
    }
  }

  @Get('protected')
  @UseGuards(AuthGuard('jwt'))
  async protectedResource() {
    return 'JWT is working';
  }
}
