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
exports.payJob = exports.findAllUnpaidJobs = void 0;
const sequelize_1 = require("sequelize");
const profile_model_1 = require("../models/profile.model");
const contract_model_1 = require("../models/contract.model");
const job_model_1 = require("../models/job.model");
const db_1 = require("../models/db");
const findAllUnpaidJobs = () => __awaiter(void 0, void 0, void 0, function* () {
    return job_model_1.Job.findAll({
        where: {
            paid: false
        }, include: {
            model: contract_model_1.Contract,
            required: true,
            where: {
                status: {
                    [sequelize_1.Op.ne]: 'terminated'
                }
            }
        }
    });
});
exports.findAllUnpaidJobs = findAllUnpaidJobs;
const payJob = (jobId) => __awaiter(void 0, void 0, void 0, function* () {
    const job = yield job_model_1.Job.findOne({
        where: {
            id: jobId, paid: false,
        },
        include: {
            model: contract_model_1.Contract,
            required: true,
            include: [{
                    model: profile_model_1.Profile,
                    required: true,
                    as: 'Client',
                }]
        }
    });
    if (!job)
        throw new Error('Job was not found');
    const { price } = job.toJSON();
    const { balance } = job.toJSON().Contract.Client;
    if (balance < price)
        throw new Error('Balance is not enough to pay');
    const t = yield db_1.sequelize.transaction();
    try {
        yield job_model_1.Job.update({
            paid: true,
            paymentDate: new Date()
        }, {
            where: {
                id: jobId
            }, transaction: t
        });
        yield profile_model_1.Profile.update({
            balance: db_1.sequelize.literal(`balance - ${price}`)
        }, {
            where: {
                id: job.toJSON().Contract.Client.id
            },
            transaction: t
        });
        yield t.commit();
        return true;
    }
    catch (error) {
        yield t.rollback();
        throw error;
    }
});
exports.payJob = payJob;
//# sourceMappingURL=job.service.js.map