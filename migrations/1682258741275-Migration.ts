import type { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1682258741275 implements MigrationInterface {
    name = 'Migration1682258741275'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "userHistory" ADD "time" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "userHistory" DROP COLUMN "time"`);
    }

}
