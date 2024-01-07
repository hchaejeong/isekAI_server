import { Body, Controller, Get, Param } from '@nestjs/common';
import { SeriesService } from './services/series.service';
import { GetAllTitlesResponseDto } from './dtos/get-all-titles.dto';
import { GetSeriesInformationResponseDto } from './dtos/get-series-info-response.dto';
import { GetAllTitlesRequestDto } from './dtos/get-all-title-request.dto';

@Controller('series')
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}
  
  @Get('/all')
  public async getAllTitles(@Body() body: GetAllTitlesRequestDto): Promise<GetAllTitlesResponseDto> {
    const { category } = body;

    const titles = await this.seriesService.getTitles({ category });

    return { titles };
  }

  @Get(':seriesId')
  public async getSeriesInformation(@Param('seriesId') seriesId: string): Promise<GetSeriesInformationResponseDto> {
    const series = await this.seriesService.getSeries({ seriesId });

    return series;
  }
}
