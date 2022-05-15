import { Request, Response } from 'express';
import * as jobService from '../services/job.service';

export const getAllUnpaindJobs = async (req: Request, res: Response): Promise<Response> => {
    try {
        const jobs = await jobService.findAllUnpaidJobs();
        if (!jobs || jobs.length === 0) return res.status(404).end();

        return res.status(200).json(jobs.map(job => ({
            id: job.id,
            description: job.description,
            paid: job.paid == null ? false : job.paid,
            price: job.price,
            paymentDate: job.paymentDate,
            contractId: job.ContractId
        })));
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

export const payJob = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { job_id } = req.params;

        const paid = await jobService.payJob(Number(job_id));
        if (!paid) return res.status(400).end();
        return res.status(200).json({ message: 'OK' });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};