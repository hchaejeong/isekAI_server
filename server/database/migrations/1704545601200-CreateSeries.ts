import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateSeries1704545601200 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'series',
                columns: [
                  {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                  },
                  {
                    name: 'name',
                    type: 'varchar',
                    length: '50',
                  },
                  {
                    name: 'summary',
                    type: 'varchar',
                    length: '500',
                    isArray: true,
                  },
                  {
                    name: 'bulletin_id',
                    type: 'uuid',
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

        await queryRunner.createForeignKeys('series', [
            new TableForeignKey({
                columnNames: ['bulletin_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'bulletin',
                onDelete: 'CASCADE',
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('series');
        const foreignKeys = table?.foreignKeys.filter((fk) => fk.columnNames.indexOf('bulletin_id') != -1) || [];
        await queryRunner.dropForeignKeys('series', foreignKeys);
        await queryRunner.dropTable('series');
    }

}
