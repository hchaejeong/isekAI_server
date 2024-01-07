import { Exclude, Expose } from "class-transformer";
import { RelationshipEntity } from "src/modules/relationship/entities/relationship.entity";
import { SeriesEntity } from "src/modules/series/entities/series.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'character',
})
export class CharacterEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @Expose()
    id: string;

    @Column({
        type: 'varchar',
        length: 50,
    })
    @Expose()
    introduced: string;

    @Column({
        type: 'varchar',
        length: 500,
    })
    @Expose()
    description: string;

    @Column({
        type: 'varchar',
        length: 5,
    })
    @Expose()
    mbti: string;

    @ManyToOne(() => SeriesEntity, (series) => series.characters)
    @Exclude({ toPlainOnly: true })
    series: SeriesEntity | null;

    @OneToMany(() => RelationshipEntity, (relationships) => relationships.character)
    @Exclude({ toPlainOnly: true })
    relationships: RelationshipEntity[] | null;
}