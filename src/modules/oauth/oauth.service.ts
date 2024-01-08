import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { UserRepository } from '../user/repository/user.repository';

@Injectable()
export class OauthService {
constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache, private userRepository: UserRepository) {}

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
    return googleUser;
  }
}
