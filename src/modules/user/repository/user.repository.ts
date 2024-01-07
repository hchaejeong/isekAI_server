import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";

@Injectable()
export class UserRepository {
    constructor(@InjectRepository(UserEntity) private repository: Repository<UserEntity>,) {}

    create(args: { email: string }): UserEntity {
        const { email } = args;

        return this.repository.create({
            email
        });
    }

    save(...args: Parameters<Repository<UserEntity>['save']>): ReturnType<Repository<UserEntity>['save']> {
        return this.repository.save(...args);
    }

    find(...args: Parameters<Repository<UserEntity>['find']>): ReturnType<Repository<UserEntity>['find']> {
        return this.repository.find(...args);
    }

    findOne(...args: Parameters<Repository<UserEntity>['findOne']>): ReturnType<Repository<UserEntity>['findOne']> {
        return this.repository.findOne(...args);
    }

    update(...args: Parameters<Repository<UserEntity>['update']>): ReturnType<Repository<UserEntity>['update']> {
        return this.repository.update(...args);
    }
}