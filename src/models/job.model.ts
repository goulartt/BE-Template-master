import { Table, Column, Model, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { Contract } from './contract.model';

@Table
export class Job extends Model {
    @Column
    description: string;

    @Column
    paid: boolean;

    @Column
    profession: string;

    @Column
    price: number;

    @Column
    paymentDate: Date;

    @ForeignKey(() => Contract)
    @Column
    ContractId: number

    @BelongsTo(() => Contract)
    contract: Contract

}