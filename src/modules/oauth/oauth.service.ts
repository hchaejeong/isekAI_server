import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { UserRepository } from '../user/repository/user.repository';
import { OAuth2Client } from 'google-auth-library';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadType } from '@src/utils/types/jwt-payload.type';

@Injectable()
export class OauthService {
constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache, private userRepository: UserRepository, @Inject('GOOGLE_CLIENT_ID') private readonly googleClientId: string, private jwtService: JwtService) {}

/*
  public async validateGoogleIdToken(idToken: string): Promise<any> {
    const client = new OAuth2Client(this.googleClientId);

    try {
      const ticket = await client.verifyIdToken({
        idToken,
        audience: this.googleClientId,
      });

      const payload = ticket.getPayload();

      console.log(payload.email);
      const currentUser = await this.userRepository.findOne({ where: { email: payload.email }});
      console.log('user', currentUser);
      if (!currentUser) {
          const user = await this.userRepository.save(
            this.userRepository.create({
              email: payload.email,
              name: payload.given_name + payload.family_name,
              profileIconUrl: payload.picture,
          }), );
          

          const jwtPayload: Omit<JwtPayloadType, 'iat' | 'exp'> = {
            id: user.id,
            email: user.email,
          }

          const jwtToken = await this.jwtService.signAsync(jwtPayload);
          
          console.log(jwtToken);
          return {
            email: payload.email,
            firstName: payload.given_name,
            lastName: payload.family_name,
            profileIcon: payload.picture,
            accessToken: idToken,
            jwtToken,
            isNewUser: true,
          };
      }
      
      const jwtPayload: Omit<JwtPayloadType, 'iat' | 'exp'> = {
        id: currentUser.id,
        email: currentUser.email,
      }
      const jwtToken = await this.jwtService.signAsync(jwtPayload);
      console.log(jwtToken);
      
      return {
        email: payload.email,
        firstName: payload.given_name,
        lastName: payload.family_name,
        profileIcon: payload.picture,
        accessToken: idToken,
        jwtToken,
        isNewUser: false,
      };
    } catch (error) {
      console.error('Error validating Google ID token:', error.message);
      throw new Error('Invalid Google ID token');
    }
  }
  */

  async validateOAuthLogin(accessToken: string, refreshToken: string, profile: any): Promise<any> {
    try {
      const { id, emails, photos, name } = profile;

      const user = await this.userRepository.findOne({ where: { email: emails[0].value }});

      if (!user) {
        const newUser = await this.userRepository.save(
          this.userRepository.create({
            email: emails[0].value,
            name: name.givenName + ' ' + name.familyName,
            profileIconUrl: photos[0].value,
          }),
        );
        
        const jwtPayload:Omit<JwtPayloadType, 'iat' | 'exp'> = {
          id: newUser.id,
          email: newUser.email,
        };

        const jwtToken = await this.jwtService.signAsync(jwtPayload);

        return {
          email: newUser.email,
          firstName: name.givenName,
          lastName: name.familyName,
          profileIcon: photos[0].value,
          accessToken,
          jwtToken,
          isNewUser: true,
        };
      }

      const jwtPayload:Omit<JwtPayloadType, 'iat' | 'exp'> = {
        id: user.id,
        email: user.email,
      };
      const jwtToken = await this.jwtService.signAsync(jwtPayload);

      return {
        email: user.email,
        firstName: name.givenName,
        lastName: name.familyName,
        profileIcon: photos[0].value,
        accessToken,
        jwtToken,
        isNewUser: false,
      };
    } catch (error) {
      console.log('Error validating OAuth login', error.message);
      throw new Error('Invalid OAuth login');
    }
  }

  /*
  public async validateGoogleLogin(email: string, firstName: string, lastName: string, profileIcon: string, accessToken: string) {
    // Validate or create a new user based on the Google profile    
    const userTempId = uuidv4();
    const user = {
        email,
        firstName,
        lastName,
        profileIcon,
        accessToken,
    }

    console.log(user);
    await this.cacheManager.set(
        `temp-google-user__${userTempId}`, 
        user, 
        10000,);
    
    const currentUser = await this.userRepository.findOne({ where: { email: email }});
    if (!currentUser) {
        await this.userRepository.save({
            email,
            name: firstName + lastName,
            profileIconUrl: profileIcon,
        });
    }
    console.log(JSON.stringify(user));
    return JSON.stringify(user);
  }

  public async handleGoogleLogin(req: Request) {
    const authorization = req.get('authorization');
    if (!authorization) throw new UnauthorizedException();

    const userTempId = authorization.replace('Bearer ', '');
    if (!uuidValidate(userTempId)) throw new UnauthorizedException("id does not match");

    const googleUser = await this.cacheManager.get(
        `temp-google-user__${userTempId}`,
    );

    //await this.handleDatabaseUser();
    
    console.log(googleUser);
    return (googleUser);
  }
  */
}
