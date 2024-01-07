import { Exclude } from "class-transformer";
import { PostEntity } from "src/modules/post/entities/post.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'bulletin',
})
export class BulletinEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({
        type: 'varchar',
        length: 50,
    })
    name: string;

    @OneToMany(() => PostEntity, (post) => post.bulletin)
    @Exclude({ toPlainOnly: true })
    posts: PostEntity[] | null;
}