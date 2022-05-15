import { Request, Response } from 'express';
import  * as profileService from '../services/profile.service';

export const depositMoney = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { userId } = req.params;
        const { amount } = req.body;

        const deposit = await profileService.depositMoney(Number(userId), Number(amount));
        if (!deposit) return res.status(400).end();
        
        return res.status(200).json({ message: 'Deposit done' });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

export const bestProfissional = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { start, end } = req.query;
        const bestProfissional = await profileService.bestProfissional(new Date(start as string), new Date(end as string));
        if (!bestProfissional) return res.status(400).end();

        return res.status(200).json(({
            id: bestProfissional.id,
            description: bestProfissional.description,
            jobsPaid: bestProfissional.toJSON().sumJobsPaid,
            profession: bestProfissional.contract.Contractor.profession
        }));
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

export const bestClients = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { start, end, limit } = req.query;
        const bestClients = await profileService.clientsPaidsTheMost(new Date(start as string), new Date(end as string), Number(limit) || 2);
        if (!bestClients || bestClients.length === 0) return res.status(400).end();    
        
        return res.status(200).json(bestClients.map(client => ({
            id: client.id,
            paid: client.paid,
            fullName: client.contract.Client.fullName
        })));
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};
