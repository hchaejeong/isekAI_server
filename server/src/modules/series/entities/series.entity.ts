import { Exclude, Expose } from "class-transformer";
import { BulletinEntity } from "src/modules/bulletin/entities/bulletin.entity";
import { CharacterEntity } from "src/modules/character/entities/character.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'series',
})
export class SeriesEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
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

    @OneToOne(() => BulletinEntity)
    @JoinColumn({ name: 'bulletin_id '})
    bulletin: BulletinEntity;

    @OneToMany(() => CharacterEntity, (characters) => characters.series)
    @Exclude({ toPlainOnly: true })
    characters: CharacterEntity[] | null;
}