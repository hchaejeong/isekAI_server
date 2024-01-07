import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateProfileRequestDto {
    @IsEmail() 
    email: string;
    
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    profileIconUrl?: string;
}