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
exports.clientsPaidsTheMost = exports.bestProfissional = exports.depositMoney = void 0;
const sequelize_1 = require("sequelize");
const job_model_1 = require("../models/job.model");
const contract_model_1 = require("../models/contract.model");
const profile_model_1 = require("../models/profile.model");
const db_1 = require("../models/db");
const depositMoney = (clientId, amountToDeposity) => __awaiter(void 0, void 0, void 0, function* () {
    const job = yield job_model_1.Job.findAll({
        where: {
            paid: false
        }, include: {
            model: contract_model_1.Contract,
            required: true,
            where: {
                status: {
                    [sequelize_1.Op.ne]: 'terminated'
                },
                ClientId: clientId
            },
        },
        attributes: [
            [db_1.sequelize.fn('sum', db_1.sequelize.col('price')), 'jobToPay']
        ],
        raw: true,
        limit: 1,
        plain: true
    });
    if (!job || job.length === 0)
        throw new Error('Job was not found');
    console.log(job);
    const jobToPay = 100;
    if (amountToDeposity > jobToPay * (25 / 100))
        throw new Error('You cannot deposit more than 25% of your jobs to pay');
    return profile_model_1.Profile.update({
        balance: db_1.sequelize.literal(`balance + ${amountToDeposity}`)
    }, {
        where: {
            id: clientId
        }
    });
});
exports.depositMoney = depositMoney;
const bestProfissional = (start, end) => __awaiter(void 0, void 0, void 0, function* () {
    return job_model_1.Job.findAll({
        limit: 1,
        plain: true,
        attributes: [
            'id',
            'description',
            [db_1.sequelize.fn('sum', db_1.sequelize.col('price')), 'sumJobsPaid']
        ],
        where: {
            paymentDate: {
                [sequelize_1.Op.between]: [start, end]
            },
            paid: true
        }, include: {
            model: contract_model_1.Contract,
            required: true,
            include: [{
                    model: profile_model_1.Profile,
                    attributes: [
                        'profession'
                    ],
                    required: true,
                    as: 'Contractor',
                    where: {
                        type: 'contractor'
                    }
                }]
        },
        group: 'profession',
        order: [[db_1.sequelize.fn('sum', db_1.sequelize.col('price')), 'DESC']]
    });
});
exports.bestProfissional = bestProfissional;
const clientsPaidsTheMost = (start, end, limit = 2) => __awaiter(void 0, void 0, void 0, function* () {
    return job_model_1.Job.findAll({
        limit,
        attributes: [
            'id',
            [db_1.sequelize.fn('sum', db_1.sequelize.col('price')), 'paid']
        ],
        where: {
            paymentDate: {
                [sequelize_1.Op.between]: [start, end]
            },
            paid: true
        }, include: {
            model: contract_model_1.Contract,
            required: true,
            include: [{
                    model: profile_model_1.Profile,
                    attributes: [
                        [db_1.sequelize.literal("firstName || ' ' || lastName"), 'fullName']
                    ],
                    required: true,
                    as: 'Client',
                    where: {
                        type: 'client'
                    }
                }]
        },
        group: 'profession',
        order: [[db_1.sequelize.fn('sum', db_1.sequelize.col('price')), 'DESC']]
    });
});
exports.clientsPaidsTheMost = clientsPaidsTheMost;
//# sourceMappingURL=profile.service.js.map