import { IsNumber, IsString } from "class-validator";

export class CreateCommentResponseDto {
    @IsString()
    content: string;

    @IsNumber()
    likes: number;
}