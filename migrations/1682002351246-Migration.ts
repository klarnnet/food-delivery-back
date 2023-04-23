import type{ MigrationInterface, QueryRunner } from "typeorm";

export class Migration1682002351246 implements MigrationInterface {
    name = 'Migration1682002351246'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "promoCode" ADD "percent" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "promoCode" DROP COLUMN "percent"`);
    }

}
