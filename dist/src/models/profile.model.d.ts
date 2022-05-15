import { Model } from 'sequelize-typescript';
import { Contract } from './contract.model';
export declare class Profile extends Model {
    firstName: string;
    lastName: string;
    profession: string;
    balance: number;
    type: string;
    Contractor: Contract[];
}