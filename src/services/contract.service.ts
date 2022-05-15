import { sequelize } from "@models/db";
import { Op } from "sequelize";
import { Contract } from "@models/contract.model";

export const findContractyById = async (id: number): Promise<Contract> => {
    const ContractRepository = sequelize.getRepository(Contract);

    return ContractRepository.findByPk(id);
};

export const findAllNonTerminatedContracts = async (): Promise<Contract[]> => {
    const ContractRepository = sequelize.getRepository(Contract);

    return ContractRepository.findAll({
        where: {
            status: {
                [Op.ne]: 'terminated'
            }
        }
    });
};

