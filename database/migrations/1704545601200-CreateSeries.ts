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
                  type: 'varchar',
                  length: '100',
                },
                {
                  name: 'seriesImage',
                  type: 'varchar',
                  length: '500',
                },
                {
                  name: 'userId',
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

      await queryRunner.createForeignKey('series', new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('series');
        const userIdForeignKey = table?.foreignKeys.find(fk => fk.columnNames.indexOf('userId') !== -1);
        
        if (userIdForeignKey) {
          await queryRunner.dropForeignKey('series', userIdForeignKey);
        }
        
        await queryRunner.dropTable('series');
    }

}
