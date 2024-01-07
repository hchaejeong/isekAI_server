import { Exclude, Expose } from "class-transformer";
import { BulletinEntity } from "src/modules/bulletin/entities/bulletin.entity";
import { CharacterEntity } from "src/modules/character/entities/character.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { BaseEntity, BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

export enum SeriesCategory {
    Movies = 'Movies',
    Books = 'Books',
    Anime = 'Anime',
    Drama = 'Drama',
}

@Entity({
    name: 'series',
})
export class SeriesEntity extends BaseEntity {
    @PrimaryColumn()
    @Expose()
    id: string;

    @Column({
        type: 'varchar',
        length: 50,
    })
    @Expose()
    name: string;

    @Column({
        type: 'varchar',
        length: 500,
        array: true,
    })
    @Expose()
    summary: string[];

    @Column({
        type: 'varchar',
        length: 100,
    })
    @Expose()
    category: SeriesCategory;

    @Column({
        type: 'varchar',
        length: 500,
    })
    @Expose()
    seriesImage: string;

    @OneToOne(() => BulletinEntity, { cascade: true })
    @JoinColumn({ name: 'bulletin_id' })
    bulletin: BulletinEntity;
    
    @ManyToMany(() => UserEntity)
    @JoinTable({ name: 'user_series' })
    user: UserEntity[] | null;

    @OneToMany(() => CharacterEntity, (characters) => characters.series)
    @Exclude({ toPlainOnly: true })
    characters: CharacterEntity[] | null;
}

