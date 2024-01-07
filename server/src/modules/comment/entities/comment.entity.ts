import { Exclude, Expose } from "class-transformer";
import { PostEntity } from "src/modules/post/entities/post.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'comment',
})
export class CommentEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @Expose()
    id: string;

    @Column({
        type: 'varchar',
        length: 255,
    })
    @Expose()
    content: string;

    @Column({
        type: 'int'
    })
    @Expose()
    likes: number;

    @ManyToOne(() => PostEntity, (post) => post.comment)
    @Exclude({ toPlainOnly: true })
    post: PostEntity | null;

    @ManyToOne(() => UserEntity, (user) => user.comments)
    @Exclude({ toPlainOnly: true })
    user: UserEntity;
}