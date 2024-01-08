import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateSeries1704545601200 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
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
                  name: 'category',
                  type: 'varchar(100)',
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

      await queryRunner.createTable(
        new Table({
          name: 'user_series_series',
          columns: [
              {
                  name: 'userId',
                  type: 'uuid',
                  isNullable: false,
              },
              {
                  name: 'seriesId',
                  type: 'uuid',
                  isNullable: false,
              },
          ],
          foreignKeys: [
              {
                  columnNames: ['userId'],
                  referencedColumnNames: ['id'],
                  referencedTableName: 'user',
                  onDelete: 'CASCADE',
              },
              {
                  columnNames: ['seriesId'],
                  referencedColumnNames: ['id'],
                  referencedTableName: 'series',
                  onDelete: 'CASCADE',
              },
          ],
          indices: [
            {
              columnNames: ['userId', 'seriesId'],
              isUnique: true,
            },
          ],
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('series');
        const foreignKeys = table?.foreignKeys.filter((fk) => fk.columnNames.indexOf('bulletin_id') != -1) || [];
        await queryRunner.dropForeignKeys('series', foreignKeys);
        await queryRunner.dropTable('user_series_series');
        await queryRunner.dropTable('series');
    }

}
