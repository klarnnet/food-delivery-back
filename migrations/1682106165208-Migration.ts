import type { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1682106165208 implements MigrationInterface {
    name = 'Migration1682106165208'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "userHistory" ADD "timestamp" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "userHistory" DROP COLUMN "timestamp"`);
    }

}
