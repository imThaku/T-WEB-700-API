import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import {User} from "../entities/User";

export class CreateAdminUser1579517200329 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        let user = new User();
        user.email = "admin@gmail.com";
        user.firstName = "Admin";
        user.lastName = "Admin";
        user.password = "admin";
        await user.encryptPassword();
        user.role = "ADMIN";
        const userRepository = getRepository(User);
        await userRepository.save(user);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
