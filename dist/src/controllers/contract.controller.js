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
exports.getAllContracts = exports.getContractById = void 0;
const contractService = require("../services/contract.service");
const getContractById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const contract = yield contractService.findContractyById(id);
        if (!contract)
            return res.status(404).end();
        return res.status(200).json(contract);
    }
    catch (err) {
        return res.status(400).json({ message: err.message });
    }
});
exports.getContractById = getContractById;
const getAllContracts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contracts = yield contractService.findAllNonTerminatedContracts();
        if (!contracts || contracts.length === 0)
            return res.status(404).end();
        return res.status(200).json(contracts);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ message: err.message });
    }
});
exports.getAllContracts = getAllContracts;
//# sourceMappingURL=contract.controller.js.map