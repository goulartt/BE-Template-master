import { Request, Response } from 'express';
import * as contractService from '@services/contract.service';

export const getContractById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const contract = await contractService.findContractyById(Number(id));
        if (!contract) return res.status(404).end();
        return res.status(200).json(contract);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

export const getAllContracts = async (req: Request, res: Response): Promise<Response> => {
    try {
        const contracts = await contractService.findAllNonTerminatedContracts();
        if (!contracts || contracts.length === 0) return res.status(404).end();
        return res.status(200).json(contracts);
    } catch (err) {
        console.log(err)
        return res.status(400).json({ message: err.message });
    }
};
