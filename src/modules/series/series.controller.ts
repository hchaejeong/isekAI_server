import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { SeriesService } from './services/series.service';
import { GetAllTitlesResponseDto } from './dtos/get-all-titles.dto';
import { GetSeriesInformationResponseDto } from './dtos/get-series-info-response.dto';
import { GetAllTitlesRequestDto } from './dtos/get-all-title-request.dto';

@Controller('series')
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}

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
}
