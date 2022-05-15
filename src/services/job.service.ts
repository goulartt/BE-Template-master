import { Op } from "sequelize";
import { Profile } from "../models/profile.model";
import { Job } from "../models/job.model";
import { Contract } from "../models/contract.model";

import { sequelize } from "../models/db";

export const findAllUnpaidJobs = async (): Promise<Job[]> => {
    const JobRepository = sequelize.getRepository(Job);

    return JobRepository.findAll({
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
                }
            }
        }
    });
};

export const payJob = async (jobId: number): Promise<boolean> => {
    const JobRepository = sequelize.getRepository(Job);
    const ProfileRepository = sequelize.getRepository(Profile);
    const ContractRepository = sequelize.getRepository(Contract);

    const job = await JobRepository.findOne({
        where: {
            id: jobId, paid: {
                [Op.or]: [null, false]
            },
        },
        include: {
            model: ContractRepository,
            required: true,
            include: [{
                model: ProfileRepository,
                as: 'Client',
                required: true,
            }]
        }
    });

    if (!job) throw new Error('Job was not found');

    const { price } = job.toJSON();
    const { balance } = job.toJSON().contract.Client;

    if (balance < price) throw new Error('Balance is not enough to pay')

    const t = await sequelize.transaction();

    try {

        await Promise.all([JobRepository.update({
            paid: true,
            paymentDate: new Date()
        }, {
            where: {
                id: jobId
            }, transaction: t
        }),

        ProfileRepository.update({
            balance: sequelize.literal(`balance - ${price}`)
        }, {
            where: {
                id: job.toJSON().contract.Client.id
            },
            transaction: t
        })
        ]);

        await t.commit();

        return true;
    } catch (error) {
        await t.rollback();
        throw error;
    }

};
