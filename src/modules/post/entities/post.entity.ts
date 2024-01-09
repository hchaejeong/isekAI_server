import { SeriesEntity } from "@src/modules/series/entities/series.entity";
import { Exclude, Expose } from "class-transformer";
import { CommentEntity } from "src/modules/comment/entities/comment.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'post',
})
export class PostEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 50,
    })
    @Expose()
    title: string;

    @Column({
        type: 'varchar',
        length: 500,
    })
    @Expose()
    content: string;

    @Column({
        type: 'int',
    })
    @Expose()
    likes: number;

    @ManyToOne(() => SeriesEntity, (series) => series.posts)
    @Exclude({ toPlainOnly: true })
    series: SeriesEntity | null;

    @Column()
    @Expose()
    seriesId: string;

    @OneToMany(() => CommentEntity, (comment) => comment.post)
    @Exclude({ toPlainOnly: true })
    comments: CommentEntity[] | null;

    @ManyToOne(() => UserEntity, (user) => user.posts)
    @Exclude({ toPlainOnly: true })
    user: UserEntity;

    @Column()
    @Expose()
    userId: string;
}