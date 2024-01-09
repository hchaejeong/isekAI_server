import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SeriesEntity } from "../entities/series.entity";

@Injectable()
export class SeriesRepository {
    constructor(@InjectRepository(SeriesEntity) private repository: Repository<SeriesEntity>,) {}

    save(...args: Parameters<Repository<SeriesEntity>['save']>): ReturnType<Repository<SeriesEntity>['save']> {
        return this.repository.save(...args);
    }

    find(...args: Parameters<Repository<SeriesEntity>['find']>): ReturnType<Repository<SeriesEntity>['find']> {
        return this.repository.find(...args);
    }

    findOne(...args: Parameters<Repository<SeriesEntity>['findOne']>): ReturnType<Repository<SeriesEntity>['findOne']> {
        return this.repository.findOne(...args);
    }

    update(...args: Parameters<Repository<SeriesEntity>['update']>): ReturnType<Repository<SeriesEntity>['update']> {
        return this.repository.update(...args);
    }
}