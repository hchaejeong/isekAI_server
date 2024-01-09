import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { SeriesService } from './services/series.service';
import { GetAllTitlesResponseDto } from './dtos/get-all-titles.dto';
import { GetSeriesInformationResponseDto } from './dtos/get-series-info-response.dto';
import { GetAllTitlesRequestDto } from './dtos/get-all-title-request.dto';
import { OpenaiService } from './services/openai.service';

@Controller('series')
export class SeriesController {
  constructor(private readonly seriesService: SeriesService, private openaiService: OpenaiService) {}

  @Get('/all')
  public async getAllSeries(@Query() query: GetAllTitlesRequestDto): Promise<GetAllTitlesResponseDto> {
    const { category } = query;

    const allSeries = await this.seriesService.getAllSeries({ category });

    return { allSeries };
  }

  @Get(':seriesId')
  public async getSeriesInformation(@Param('seriesId') seriesId: string): Promise<GetSeriesInformationResponseDto> {
    const series = await this.seriesService.getSeries({ seriesId });

    return series;
  }

  @Get(':seriesId/character/:characterName/relationships')
  public async getCharacterRelationships(@Param('seriesId') seriesId: string, @Param('characterName') characterName: string): Promise<string> {
    const { series } = await this.seriesService.getSeries({ seriesId });

    const selectedCharacter = characterName;
    const remainingCharacters = series.characters.filter((character) => character.name !== selectedCharacter).map((character) => character.name);
    const seriesName = series.name;

    const characterRelationships = await this.openaiService.getCharacterRelationships({
      seriesName,
      selectedCharacter,
      remainingCharacters,
    });

    return characterRelationships;
  }
}
