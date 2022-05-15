import { Response } from 'express';
import * as contractService from '@services/contract.service';

export const getContractById = async (req, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const profileId = req.profile.id; 

        const contract = await contractService.findContractyById(Number(id), Number(profileId));
        if (!contract) return res.status(404).end();
        return res.status(200).json(contract);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

export const getAllContracts = async (req, res: Response): Promise<Response> => {
    try {
        const profileId = req.profile.id; 
        const contracts = await contractService.findAllNonTerminatedContracts(Number(profileId));
        if (!contracts || contracts.length === 0) return res.status(404).end();
        return res.status(200).json(contracts);
    } catch (err) {
        console.log(err)
        return res.status(400).json({ message: err.message });
    }
};
