import type { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1682106574691 implements MigrationInterface {
    name = 'Migration1682106574691'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "userHistory" DROP COLUMN "timestamp"`);
        await queryRunner.query(`ALTER TABLE "userHistory" ADD "timestamp" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "userHistory" DROP COLUMN "timestamp"`);
        await queryRunner.query(`ALTER TABLE "userHistory" ADD "timestamp" integer NOT NULL`);
    }

}
