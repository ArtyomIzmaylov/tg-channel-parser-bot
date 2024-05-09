import {Sequelize} from "sequelize";
import {ConfigService} from "./config.service";

const configService = new ConfigService()
export const sequelize = new Sequelize(
    configService.get('POSTGRES_DB'),
    configService.get('POSTGRES_USER'),
    configService.get('POSTGRES_PASSWORD'), {
        dialect: "postgres",
        host : "localhost",
        port: parseInt(configService.get('POSTGRES_PORT'))
});