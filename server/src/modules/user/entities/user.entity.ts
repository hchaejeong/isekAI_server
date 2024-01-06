import { Exclude, Expose } from "class-transformer";
import { SeriesEntity } from "src/modules/series/entities/series.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'user',
})
export class UserEntity extends BaseEntity {
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
        length: 255,
        unique: true,
    })
    @Expose()
    email: string;

    @Column({
        type: 'varchar',
        length: 200,
        nullable: true,
    })
    @Expose()
    profileIconUrl?: string;

    @OneToMany(() => SeriesEntity, (series) => series.user)
    @Exclude({ toPlainOnly: true })
    series: SeriesEntity[] | null;

}