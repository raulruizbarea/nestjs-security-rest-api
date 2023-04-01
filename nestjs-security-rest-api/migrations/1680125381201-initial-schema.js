const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class initialSchema1680125381201 {
  name = 'initialSchema1680125381201';

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE "subject" ("id" uuid NOT NULL, "code" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_12eee115462e38d62e5455fc054" PRIMARY KEY ("id"))`,
    );
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE "subject"`);
  }
};
