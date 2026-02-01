import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateIdToString1769955795967 implements MigrationInterface {
    name = 'UpdateIdToString1769955795967'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "card" DROP CONSTRAINT "PK_9451069b6f1199730791a7f4ae4"`);
        await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "card" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "card" ADD CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "card" DROP CONSTRAINT "PK_9451069b6f1199730791a7f4ae4"`);
        await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "card" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "card" ADD CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
    }

}
