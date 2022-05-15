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
exports.bestClients = exports.bestProfissional = exports.depositMoney = void 0;
const profileService = require("../services/profile.service");
const depositMoney = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { amount } = req.body;
        const deposit = yield profileService.depositMoney(userId, amount);
        if (!deposit)
            return res.status(400).end();
        return res.status(200).json({ message: 'Deposit done' });
    }
    catch (err) {
        return res.status(400).json({ message: err.message });
    }
});
exports.depositMoney = depositMoney;
const bestProfissional = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { start, end } = req.query;
        const bestProfissional = yield profileService.bestProfissional(new Date(start), new Date(end));
        if (!bestProfissional || bestProfissional.length === 0)
            return res.status(400).end();
        return res.status(200).json(bestProfissional);
    }
    catch (err) {
        return res.status(400).json({ message: err.message });
    }
});
exports.bestProfissional = bestProfissional;
const bestClients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { start, end, limit } = req.query;
        const bestClients = yield profileService.clientsPaidsTheMost(new Date(start), new Date(end), limit);
        if (!bestClients || bestClients.length === 0)
            return res.status(400).end();
        return res.status(200).json(bestClients);
    }
    catch (err) {
        return res.status(400).json({ message: err.message });
    }
});
exports.bestClients = bestClients;
//# sourceMappingURL=profile.controller.js.map