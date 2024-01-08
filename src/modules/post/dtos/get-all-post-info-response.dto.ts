import { IsArray, IsNumber, IsString } from "class-validator";

export class GetAllPostInfoResponseDto {
    @IsString()
    @IsArray()
    titles: string[];

    @IsNumber()
    @IsArray()
    likes: number[];
}