import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeCryptoTableStruct21579522935473 implements MigrationInterface {
    name = 'ChangeCryptoTableStruct21579522935473'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `crypto` DROP FOREIGN KEY `FK_5ab7626b34e1aefd829ae9c112b`", undefined);
        await queryRunner.query("ALTER TABLE `crypto` DROP COLUMN `userId`", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `crypto` ADD `userId` varchar(36) NULL", undefined);
        await queryRunner.query("ALTER TABLE `crypto` ADD CONSTRAINT `FK_5ab7626b34e1aefd829ae9c112b` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

}
