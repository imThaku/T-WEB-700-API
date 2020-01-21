import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeCryptoTableStruct31579522984372 implements MigrationInterface {
    name = 'ChangeCryptoTableStruct31579522984372'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `user_cryptos_crypto` (`userId` varchar(36) NOT NULL, `cryptoId` varchar(36) NOT NULL, INDEX `IDX_21b7660ebfba646ca79193bd91` (`userId`), INDEX `IDX_f2a63f321f0926b1a98b87b1a4` (`cryptoId`), PRIMARY KEY (`userId`, `cryptoId`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `user_cryptos_crypto` ADD CONSTRAINT `FK_21b7660ebfba646ca79193bd910` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `user_cryptos_crypto` ADD CONSTRAINT `FK_f2a63f321f0926b1a98b87b1a43` FOREIGN KEY (`cryptoId`) REFERENCES `crypto`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user_cryptos_crypto` DROP FOREIGN KEY `FK_f2a63f321f0926b1a98b87b1a43`", undefined);
        await queryRunner.query("ALTER TABLE `user_cryptos_crypto` DROP FOREIGN KEY `FK_21b7660ebfba646ca79193bd910`", undefined);
        await queryRunner.query("DROP INDEX `IDX_f2a63f321f0926b1a98b87b1a4` ON `user_cryptos_crypto`", undefined);
        await queryRunner.query("DROP INDEX `IDX_21b7660ebfba646ca79193bd91` ON `user_cryptos_crypto`", undefined);
        await queryRunner.query("DROP TABLE `user_cryptos_crypto`", undefined);
    }

}
