import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOwnerIdToCard1773000000000 implements MigrationInterface {
  name = 'AddOwnerIdToCard1773000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "card" ADD "ownerId" character varying`);
    await queryRunner.query(
      `UPDATE "card" SET "ownerId" = "creator"->>'ownerId' WHERE "creator" IS NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "ownerId"`);
  }
}