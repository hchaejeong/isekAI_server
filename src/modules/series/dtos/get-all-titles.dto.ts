import { IsArray, IsString } from "class-validator";

export class GetAllTitlesResponseDto {
    @IsString()
    @IsArray()
    titles: string[]
}