import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCardHints1769867632933 implements MigrationInterface {
    name = 'UpdateCardHints1769867632933'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "hints"`);
        await queryRunner.query(`ALTER TABLE "card" ADD "hints" text array`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "hints"`);
        await queryRunner.query(`ALTER TABLE "card" ADD "hints" jsonb`);
    }

}
