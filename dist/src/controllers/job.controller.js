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
exports.payJob = exports.getAllUnpaindJobs = void 0;
const jobService = require("../services/job.service");
const getAllUnpaindJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobs = yield jobService.findAllUnpaidJobs();
        if (!jobs || jobs.length === 0)
            return res.status(404).end();
        return res.status(200).json(jobs);
    }
    catch (err) {
        return res.status(400).json({ message: err.message });
    }
});
exports.getAllUnpaindJobs = getAllUnpaindJobs;
const payJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { job_id } = req.params;
        const paid = yield jobService.payJob(job_id);
        if (!paid)
            return res.status(400).end();
        return res.status(200).json({ message: 'OK' });
    }
    catch (err) {
        return res.status(400).json({ message: err.message });
    }
});
exports.payJob = payJob;
//# sourceMappingURL=job.controller.js.map