import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePost1704689512290 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
        await queryRunner.createTable(
            new Table({
                name: 'post',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                        length: '50',
                    },
                    {
                        name: 'content',
                        type: 'varchar',
                        length: '500',
                    },
                    {
                        name: 'likes',
                        type: 'int',
                    },
                    {
                        name: 'seriesId',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'userId',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp with time zone',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp with time zone',
                        default: 'now()',
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey('post', new TableForeignKey({
            columnNames: ['seriesId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'series',
            onDelete: 'CASCADE',
        }));

        await queryRunner.createForeignKey('post', new TableForeignKey({
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('post');
        const seriesIdForeignKey = table?.foreignKeys.find(fk => fk.columnNames.indexOf('seriesId') !== -1);
        const userIdForeignKey = table?.foreignKeys.find(fk => fk.columnNames.indexOf('userId') !== -1);

        if (seriesIdForeignKey) {
            await queryRunner.dropForeignKey('post', seriesIdForeignKey);
        }
        if (userIdForeignKey) {
            await queryRunner.dropForeignKey('post', userIdForeignKey);
        }

        await queryRunner.dropTable('post');
    }

}
