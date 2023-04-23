import type{ MigrationInterface, QueryRunner } from "typeorm";

export class Migration1682201010232 implements MigrationInterface {
    name = 'Migration1682201010232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "creditCard" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "image" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "creditCard"`);
    }

}
