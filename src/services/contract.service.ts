import { sequelize } from "@models/db";
import { Op } from "sequelize";
import { Contract } from "@models/contract.model";

export const findContractyById = async (id: number, profileId: number): Promise<Contract> => {
    const ContractRepository = sequelize.getRepository(Contract);

    return ContractRepository.findOne({
        where: {
            id,
            [Op.or]: [
                { ContractorId: profileId },
                { ClientId: profileId },
            ]
        }
    });
};

export const findAllNonTerminatedContracts = async (profileId: number): Promise<Contract[]> => {
    const ContractRepository = sequelize.getRepository(Contract);

    return ContractRepository.findAll({
        where: {
            status: {
                [Op.ne]: 'terminated'
            },
            [Op.or]: [
                { ContractorId: profileId },
                { ClientId: profileId },
            ]
        }
    });
};

