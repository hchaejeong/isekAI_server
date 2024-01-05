import { Exclude, Expose } from "class-transformer";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'series',
})
export class SeriesEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @Expose()
    id: string;

    @ManyToOne(() => UserEntity)
    @Exclude({ toPlainOnly: true })
    user: UserEntity | null;

    @Column()
    @Expose()
    userId: string;

    @Column({
        type: 'varchar',
        length: 500,
    })
    @Expose()
    summary: string;
}