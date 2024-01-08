import { Injectable } from '@nestjs/common';
import { SeriesRepository } from '../repositories/series.repository';
import { SeriesCategory, SeriesEntity } from '../entities/series.entity';

@Injectable()
export class SeriesService {
    constructor(private seriesRepository: SeriesRepository) {}

    async getSeries(args: { seriesId: string }): Promise<{ series: SeriesEntity }> {
        const { seriesId } = args;

        const series = await this.seriesRepository.findOne({
            where: {
                id: seriesId,
            },
            relations: ['characters'],
        });

        return { series };
    }

    async getAllSeries(args: { category: SeriesCategory }): Promise<SeriesEntity[]> {
        const { category } = args;

        const seriesEntities = await this.seriesRepository.find({
            where: { category },
        });

        return seriesEntities;
    }
}
