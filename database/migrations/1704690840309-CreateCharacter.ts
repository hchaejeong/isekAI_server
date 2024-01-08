import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateCharacter1704690840309 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
        await queryRunner.createTable(
            new Table({
                name: 'character',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'introduced',
                        type: 'varchar',
                        length: '50',
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        length: '500',
                    },
                    {
                        name: 'mbti',
                        type: 'varchar',
                        length: '5',
                    },
                    {
                        name: 'characterImage',
                        type: 'varchar',
                        length: '500',
                    },
                    {
                        name: 'seriesId',
                        type: 'uuid',
                        isNullable: false,
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey('character', new TableForeignKey({
            columnNames: ['seriesId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'series',
            onDelete: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('character');

        const seriesIdForeignKey = table?.foreignKeys.find(fk => fk.columnNames.indexOf('seriesId') !== -1);
        
        if (seriesIdForeignKey) {
            await queryRunner.dropForeignKey('character', seriesIdForeignKey);
        }

        await queryRunner.dropTable('character');
    }

}
