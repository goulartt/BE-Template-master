import { Model } from 'sequelize-typescript';
import { Contract } from './contract.model';
export declare class Job extends Model {
    description: string;
    paid: boolean;
    profession: string;
    price: number;
    paymentDate: Date;
    contractId: number;
    contract: Contract;
}
