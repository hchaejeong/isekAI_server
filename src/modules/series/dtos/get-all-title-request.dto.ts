import { IsEnum, IsIn, IsString } from "class-validator";
import { SeriesCategory } from "../entities/series.entity";

export class GetAllTitlesRequestDto {
    @IsString()
    @IsIn(['Movies', 'Books', 'Drama', 'Anime'])
    category: SeriesCategory;
}