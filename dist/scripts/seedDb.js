"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const contract_model_1 = require("../src/models/contract.model");
const job_model_1 = require("../src/models/job.model");
const profile_model_1 = require("../src/models/profile.model");
const db_1 = require("../src/models/db");
seed();
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        const ProfileRepository = db_1.sequelize.getRepository(profile_model_1.Profile);
        const JobRepository = db_1.sequelize.getRepository(job_model_1.Job);
        const ContractRepository = db_1.sequelize.getRepository(contract_model_1.Contract);
        yield ProfileRepository.sync({ force: true });
        yield ContractRepository.sync({ force: true });
        yield JobRepository.sync({ force: true });
        yield Promise.all([
            ProfileRepository.create({
                id: 1,
                firstName: 'Harry',
                lastName: 'Potter',
                profession: 'Wizard',
                balance: 1150,
                type: 'client'
            }),
            ProfileRepository.create({
                id: 2,
                firstName: 'Mr',
                lastName: 'Robot',
                profession: 'Hacker',
                balance: 231.11,
                type: 'client'
            }),
            ProfileRepository.create({
                id: 3,
                firstName: 'John',
                lastName: 'Snow',
                profession: 'Knows nothing',
                balance: 451.3,
                type: 'client'
            }),
            ProfileRepository.create({
                id: 4,
                firstName: 'Ash',
                lastName: 'Kethcum',
                profession: 'Pokemon master',
                balance: 1.3,
                type: 'client'
            }),
            ProfileRepository.create({
                id: 5,
                firstName: 'John',
                lastName: 'Lenon',
                profession: 'Musician',
                balance: 64,
                type: 'contractor'
            }),
            ProfileRepository.create({
                id: 6,
                firstName: 'Linus',
                lastName: 'Torvalds',
                profession: 'Programmer',
                balance: 1214,
                type: 'contractor'
            }),
            ProfileRepository.create({
                id: 7,
                firstName: 'Alan',
                lastName: 'Turing',
                profession: 'Programmer',
                balance: 22,
                type: 'contractor'
            }),
            ProfileRepository.create({
                id: 8,
                firstName: 'Aragorn',
                lastName: 'II Elessar Telcontarvalds',
                profession: 'Fighter',
                balance: 314,
                type: 'contractor'
            }),
            ContractRepository.create({
                id: 1,
                terms: 'bla bla bla',
                status: 'terminated',
                ClientId: 1,
                ContractorId: 5
            }),
            ContractRepository.create({
                id: 2,
                terms: 'bla bla bla',
                status: 'in_progress',
                ClientId: 1,
                ContractorId: 6
            }),
            ContractRepository.create({
                id: 3,
                terms: 'bla bla bla',
                status: 'in_progress',
                ClientId: 2,
                ContractorId: 6
            }),
            ContractRepository.create({
                id: 4,
                terms: 'bla bla bla',
                status: 'in_progress',
                ClientId: 2,
                ContractorId: 7
            }),
            ContractRepository.create({
                id: 5,
                terms: 'bla bla bla',
                status: 'new',
                ClientId: 3,
                ContractorId: 8
            }),
            ContractRepository.create({
                id: 6,
                terms: 'bla bla bla',
                status: 'in_progress',
                ClientId: 3,
                ContractorId: 7
            }),
            ContractRepository.create({
                id: 7,
                terms: 'bla bla bla',
                status: 'in_progress',
                ClientId: 4,
                ContractorId: 7
            }),
            ContractRepository.create({
                id: 8,
                terms: 'bla bla bla',
                status: 'in_progress',
                ClientId: 4,
                ContractorId: 6
            }),
            ContractRepository.create({
                id: 9,
                terms: 'bla bla bla',
                status: 'in_progress',
                ClientId: 4,
                ContractorId: 8
            }),
            JobRepository.create({
                description: 'work',
                price: 200,
                ContractId: 1,
            }),
            JobRepository.create({
                description: 'work',
                price: 201,
                ContractId: 2,
            }),
            JobRepository.create({
                description: 'work',
                price: 202,
                ContractId: 3,
            }),
            JobRepository.create({
                description: 'work',
                price: 200,
                ContractId: 4,
            }),
            JobRepository.create({
                description: 'work',
                price: 200,
                ContractId: 7,
            }),
            JobRepository.create({
                description: 'work',
                price: 2020,
                paid: true,
                paymentDate: '2020-08-15T19:11:26.737Z',
                ContractId: 7,
            }),
            JobRepository.create({
                description: 'work',
                price: 200,
                paid: true,
                paymentDate: '2020-08-15T19:11:26.737Z',
                ContractId: 2,
            }),
            JobRepository.create({
                description: 'work',
                price: 200,
                paid: true,
                paymentDate: '2020-08-16T19:11:26.737Z',
                ContractId: 3,
            }),
            JobRepository.create({
                description: 'work',
                price: 200,
                paid: true,
                paymentDate: '2020-08-17T19:11:26.737Z',
                ContractId: 1,
            }),
            JobRepository.create({
                description: 'work',
                price: 200,
                paid: true,
                paymentDate: '2020-08-17T19:11:26.737Z',
                ContractId: 5,
            }),
            JobRepository.create({
                description: 'work',
                price: 21,
                paid: true,
                paymentDate: '2020-08-10T19:11:26.737Z',
                ContractId: 1,
            }),
            JobRepository.create({
                description: 'work',
                price: 21,
                paid: true,
                paymentDate: '2020-08-15T19:11:26.737Z',
                ContractId: 2,
            }),
            JobRepository.create({
                description: 'work',
                price: 121,
                paid: true,
                paymentDate: '2020-08-15T19:11:26.737Z',
                ContractId: 3,
            }),
            JobRepository.create({
                description: 'work',
                price: 121,
                paid: true,
                paymentDate: '2020-08-14T23:11:26.737Z',
                ContractId: 3,
            }),
        ]);
    });
}
//# sourceMappingURL=seedDb.js.map