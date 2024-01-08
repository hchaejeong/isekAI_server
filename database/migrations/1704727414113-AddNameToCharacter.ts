import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddNameToCharacter1704727414113 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'character',
            new TableColumn({
                name: 'name',
                type: 'varchar',
                length: '10',
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('character', 'name');
    }

}
