import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CharacterEntity } from "../entities/character.entity";

@Injectable()
export class CharacterRepository {
    constructor(@InjectRepository(CharacterEntity) private repository: Repository<CharacterEntity>,) {}

    save(...args: Parameters<Repository<CharacterEntity>['save']>): ReturnType<Repository<CharacterEntity>['save']> {
        return this.repository.save(...args);
    }

    find(...args: Parameters<Repository<CharacterEntity>['find']>): ReturnType<Repository<CharacterEntity>['find']> {
        return this.repository.find(...args);
    }

    findOne(...args: Parameters<Repository<CharacterEntity>['findOne']>): ReturnType<Repository<CharacterEntity>['findOne']> {
        return this.repository.findOne(...args);
    }

    update(...args: Parameters<Repository<CharacterEntity>['update']>): ReturnType<Repository<CharacterEntity>['update']> {
        return this.repository.update(...args);
    }
}