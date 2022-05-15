import { Table, Column, Model, HasMany, DataType } from 'sequelize-typescript'
import { Contract } from './contract.model';

@Table
export class Profile extends Model {
    @Column
    firstName: string

    @Column
    lastName: string

    @Column
    profession: string;

    @Column
    balance: number;

    @Column(new DataType.ENUM('client', 'contractor'))
    type: string;

    @HasMany(() => Contract)
    Contractor: Contract[];

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`; 
    }
 
}