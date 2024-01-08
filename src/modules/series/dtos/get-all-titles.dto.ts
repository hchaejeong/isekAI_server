import { IsArray, IsString } from "class-validator";
import { SeriesEntity } from "../entities/series.entity";

export class GetAllTitlesResponseDto {
    @IsString()
    @IsArray()
    allSeries: SeriesEntity[]
}