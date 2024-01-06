import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUser1704527017981 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user',
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
                    name: 'email',
                    type: 'varchar',
                    length: '255',
                    isUnique: true,
                  },
                  {
                    name: 'profileIconUrl',
                    type: 'varchar',
                    length: '200',
                    isUnique: true,
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
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user');
    }

}
