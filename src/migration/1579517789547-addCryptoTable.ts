import {MigrationInterface, QueryRunner} from "typeorm";

export class addCryptoTable1579517789547 implements MigrationInterface {
    name = 'addCryptoTable1579517789547'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `crypto` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `currentPrice` int NOT NULL, `openingPrice` int NOT NULL, `lowestPrice` int NOT NULL, `highPrice` int NOT NULL, `URL` varchar(255) NOT NULL, `createdDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE `crypto`", undefined);
    }

}
