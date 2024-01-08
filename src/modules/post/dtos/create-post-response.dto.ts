import { IsNumber, IsString, isNumber } from "class-validator";

export class CreatePostResponseDto {
    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsNumber()
    likes: number;
}