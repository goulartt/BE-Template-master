import { Op } from "sequelize";
import { Job } from "../models/job.model";
import { Profile } from "../models/profile.model";
import { sequelize } from "../models/db";

/**
 * This function will deposit an amount of money for the given client id
 * 
 * You cannot deposit more than 25% of your jobs to pay
 * @param clientId 
 * @param amountToDeposit
 * @returns 
 */
export const depositMoney = async (clientId: number, amountToDeposit: number): Promise<[affectedCount: number]> => {
    const JobRepository = sequelize.getRepository(Job);
    const ProfileRepository = sequelize.getRepository(Profile);

    const job = await JobRepository.findAll({
        where: {
            paid: {
                [Op.or]: [null, false]
            }
        }, include: {
            model: sequelize.models.Contract,
            required: true,
            where: {
                status: {
                    [Op.ne]: 'terminated'
                },
                ClientId: clientId
            },
        },
        attributes: [
            [sequelize.fn('sum', sequelize.col('price')), 'jobToPay']
        ],
        raw: true,
        limit: 1,
        plain: true
    }) as unknown as { jobToPay: number };

    if (!job) throw new Error('Job was not found')

    const { jobToPay } = job;

    if (amountToDeposit > jobToPay * (25 / 100)) throw new Error('You cannot deposit more than 25% of your jobs to pay');

    return ProfileRepository.update({
        balance: sequelize.literal(`balance + ${amountToDeposit}`)
    }, {
        where: {
            id: clientId
        }
    });
};

/**
 * This function will return the profession which earned more money in the given time range
 * @param start 
 * @param end 
 * @returns 
 */
export const bestProfession = async (start: Date, end: Date): Promise<Job> => {
    const JobRepository = sequelize.getRepository(Job);

    return JobRepository.findOne({
        limit: 1,
        plain: true,
        attributes: [
            'id',
            'description',
            [sequelize.fn('sum', sequelize.col('price')), 'sumJobsPaid']
        ],
        where: {
            paymentDate: {
                [Op.between]: [start, end]
            },
            paid: true
        }, include: {
            model: sequelize.models.Contract,
            required: true,
            include: [{
                model: sequelize.models.Profile,
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
        group: 'contract->Contractor.profession',
        order: [[sequelize.fn('sum', sequelize.col('price')), 'DESC']]
    });
};

/**
 * This will return an array of clients whose spent more money in the given time range
 * @param start 
 * @param end 
 * @param limit 
 * @returns 
 */
export const clientsPaidsTheMost = async (start: Date, end: Date, limit = 2): Promise<Job[]> => {
    const JobRepository = sequelize.getRepository(Job);

    return JobRepository.findAll({
        limit,
        attributes: [
            'id',
            [sequelize.fn('sum', sequelize.col('price')), 'paid']
        ],
        where: {
            paymentDate: {
                [Op.between]: [start, end]
            },
            paid: true
        }, include: {
            model: sequelize.models.Contract,
            required: true,
            include: [{
                model: sequelize.models.Profile,
                required: true,
                as: 'Client',
                where: {
                    type: 'client'
                }
            }]
        },
        group: 'contract->Client.profession',
        order: [[sequelize.fn('sum', sequelize.col('price')), 'DESC']]
    });
};
