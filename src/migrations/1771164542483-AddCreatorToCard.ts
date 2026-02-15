import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreatorToCard1771164542483 implements MigrationInterface {
    name = 'AddCreatorToCard1771164542483'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "card" ADD "creator" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "creator"`);
    }

}
