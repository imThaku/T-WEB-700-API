import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeUserTable1579599886264 implements MigrationInterface {
    name = 'ChangeUserTable1579599886264'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `crypto` CHANGE `currentPrice` `currentPrice` float NOT NULL DEFAULT 0", undefined);
        await queryRunner.query("ALTER TABLE `crypto` CHANGE `openingPrice` `openingPrice` float NOT NULL DEFAULT 0", undefined);
        await queryRunner.query("ALTER TABLE `crypto` CHANGE `lowestPrice` `lowestPrice` float NOT NULL DEFAULT 0", undefined);
        await queryRunner.query("ALTER TABLE `crypto` CHANGE `highPrice` `highPrice` float NOT NULL DEFAULT 0", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `crypto` CHANGE `highPrice` `highPrice` float(12) NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `crypto` CHANGE `lowestPrice` `lowestPrice` float(12) NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `crypto` CHANGE `openingPrice` `openingPrice` float(12) NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `crypto` CHANGE `currentPrice` `currentPrice` float(12) NOT NULL DEFAULT '0'", undefined);
    }

}
