import type{ MigrationInterface, QueryRunner } from "typeorm";

export class Migration1681945626501 implements MigrationInterface {
    name = 'Migration1681945626501'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "food" ("id" SERIAL NOT NULL, "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "category" character varying NOT NULL, "coast" double precision NOT NULL, "stars" double precision NOT NULL, "time" double precision NOT NULL, "image" character varying NOT NULL, "about" character varying NOT NULL, CONSTRAINT "PK_26d12de4b6576ff08d30c281837" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorite" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "foodId" integer NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_495675cec4fb09666704e4f610f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "courier" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "image" character varying NOT NULL, "phone" character varying NOT NULL, CONSTRAINT "PK_94613ec7dc72f7dfa2d072a31cf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "userHistory" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" character varying NOT NULL DEFAULT 'in progress', "adress" character varying NOT NULL DEFAULT 'Minsk', "courierId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_95019340fe7b543dac20daf481d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "refreshToken" character varying, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "promoCode" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_d572f43275b2b033b1746ecfa04" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "favorite" ADD CONSTRAINT "FK_c4659bdb5418fcae92c92e1929d" FOREIGN KEY ("foodId") REFERENCES "food"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite" ADD CONSTRAINT "FK_83b775fdebbe24c29b2b5831f2d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "userHistory" ADD CONSTRAINT "FK_ad6fa3ada3db097177d1540f18d" FOREIGN KEY ("courierId") REFERENCES "courier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "userHistory" ADD CONSTRAINT "FK_08e03b72cd298983c224b062ac5" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "userHistory" DROP CONSTRAINT "FK_08e03b72cd298983c224b062ac5"`);
        await queryRunner.query(`ALTER TABLE "userHistory" DROP CONSTRAINT "FK_ad6fa3ada3db097177d1540f18d"`);
        await queryRunner.query(`ALTER TABLE "favorite" DROP CONSTRAINT "FK_83b775fdebbe24c29b2b5831f2d"`);
        await queryRunner.query(`ALTER TABLE "favorite" DROP CONSTRAINT "FK_c4659bdb5418fcae92c92e1929d"`);
        await queryRunner.query(`DROP TABLE "promoCode"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "userHistory"`);
        await queryRunner.query(`DROP TABLE "courier"`);
        await queryRunner.query(`DROP TABLE "favorite"`);
        await queryRunner.query(`DROP TABLE "food"`);
    }

}
