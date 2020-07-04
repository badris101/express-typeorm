import { MigrationInterface, QueryRunner } from "typeorm";

export class GameKeyRefactoring1593707606111 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE game_key ADD COLUMN status varchar(255) NOT NULL DEFAULT 'NOT_USED'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE game_key DROP COLUMN status`);
  }
}
