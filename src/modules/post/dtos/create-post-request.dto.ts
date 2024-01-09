import { IsString } from "class-validator";

export class CreatePostRequestDto {
    @IsString()
    title: string;

    @IsString()
    content: string;
}