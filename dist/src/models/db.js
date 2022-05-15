"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const contract_model_1 = require("./contract.model");
const job_model_1 = require("./job.model");
const profile_model_1 = require("./profile.model");
exports.sequelize = new sequelize_typescript_1.Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite3',
    repositoryMode: true,
    models: [profile_model_1.Profile, contract_model_1.Contract, job_model_1.Job]
});
//# sourceMappingURL=db.js.map