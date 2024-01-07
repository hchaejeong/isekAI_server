import { IsEmail, IsString } from "class-validator";

export class GoogleLoginCallbackDto {
    @IsEmail()
    email: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    profileIcon: string;

    @IsString()
    accessToken: string;
}