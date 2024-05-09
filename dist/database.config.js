"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const config_service_1 = require("./config.service");
const configService = new config_service_1.ConfigService();
exports.sequelize = new sequelize_1.Sequelize(configService.get('POSTGRES_DB'), configService.get('POSTGRES_USER'), configService.get('POSTGRES_PASSWORD'), {
    dialect: "postgres",
    host: "localhost",
    port: parseInt(configService.get('POSTGRES_PORT'))
});
