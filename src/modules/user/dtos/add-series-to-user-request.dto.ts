import { SeriesCategory, SeriesEntity } from "@src/modules/series/entities/series.entity";
import { IsArray, IsIn, IsString } from "class-validator";

export class AddSeriesToUserRequestDto {
    @IsString()
    @IsArray()
    selectedSeriesIds: string[];
}