import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateComment1704689956925 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
        await queryRunner.createTable(
            new Table({
                name: 'comment',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'content',
                        type: 'varchar',
                        length: '255',
                    },
                    {
                        name: 'likes',
                        type: 'int',
                    },
                    {
                        name: 'postId',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'userId',
                        type: 'uuid',
                        isNullable: false,
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey('comment', new TableForeignKey({
            columnNames: ['postId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'post',
            onDelete: 'CASCADE',
        }));

        await queryRunner.createForeignKey('comment', new TableForeignKey({
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('comment');

        const postIdForeignKey = table?.foreignKeys.find(fk => fk.columnNames.indexOf('postId') !== -1);
        const userIdForeignKey = table?.foreignKeys.find(fk => fk.columnNames.indexOf('userId') !== -1);

        if (postIdForeignKey) {
            await queryRunner.dropForeignKey('comment', postIdForeignKey);
        }
        if (userIdForeignKey) {
            await queryRunner.dropForeignKey('comment', userIdForeignKey);
        }
        await queryRunner.dropTable('comment');
    }

}
