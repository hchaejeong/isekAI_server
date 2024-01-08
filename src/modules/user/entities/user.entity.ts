import { Exclude, Expose } from "class-transformer";
import { CommentEntity } from "src/modules/comment/entities/comment.entity";
import { PostEntity } from "src/modules/post/entities/post.entity";
import { SeriesEntity } from "src/modules/series/entities/series.entity";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToMany(() => SeriesEntity)
    @JoinTable({ name: 'user_series' })
    series: SeriesEntity[] | null;

    @OneToMany(() => PostEntity, (posts) => posts.user)
    @Exclude({ toPlainOnly: true })
    posts: PostEntity[] | null;

    @OneToMany(() => CommentEntity, (comments) => comments.user)
    @Exclude({ toPlainOnly: true })
    comments: CommentEntity[] | null;
}