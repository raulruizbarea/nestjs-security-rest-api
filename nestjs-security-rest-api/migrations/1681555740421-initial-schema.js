const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class InitialSchema1681555740421 {
    name = 'InitialSchema1681555740421'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "subject" DROP COLUMN "surname"`);
        await queryRunner.query(`ALTER TABLE "subject" ALTER COLUMN "id" SET DEFAULT '1eddb7b2-b7b2-6f80-7b50-3b6c7e58dd3a'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "subject" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "subject" ADD "surname" character varying`);
    }
}
