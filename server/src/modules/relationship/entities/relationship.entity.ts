import { Exclude, Expose } from "class-transformer";
import { CharacterEntity } from "src/modules/character/entities/character.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'relationship',
})
export class RelationshipEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @Expose()
    id: string;

    @Column({
        type: 'varchar',
        length: 25,
    })
    @Expose()
    characterName: string;

    @Column({
        type: 'varchar',
        length: 500,
    })
    @Expose()
    description: string;

    @ManyToOne(() => CharacterEntity, (character) => character.relationships)
    @Exclude({ toPlainOnly: true })
    character: CharacterEntity | null;
}