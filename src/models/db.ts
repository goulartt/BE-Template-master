import { Sequelize } from "sequelize-typescript";
import { Contract } from "./contract.model";
import { Job } from "./job.model";
import { Profile } from "./profile.model";

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3',
  repositoryMode: true,
  models: [Profile, Contract, Job]
});


