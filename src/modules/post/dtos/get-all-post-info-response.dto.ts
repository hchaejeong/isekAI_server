import { IsArray, IsNumber, IsString } from "class-validator";

export class GetAllPostInfoResponseDto {
    @IsString()
    ids: string[];
    
    @IsString()
    @IsArray()
    titles: string[];

    @IsNumber()
    @IsArray()
    likes: number[];
}