import {MigrationInterface, QueryRunner} from "typeorm";

export class addUserTable1579517138033 implements MigrationInterface {
    name = 'addUserTable1579517138033'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `user` (`id` varchar(36) NOT NULL, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `role` varchar(255) NOT NULL, `createdDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`", undefined);
        await queryRunner.query("DROP TABLE `user`", undefined);
    }

}
