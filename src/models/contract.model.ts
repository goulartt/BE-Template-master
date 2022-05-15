import { Table, Column, Model, BelongsTo, HasMany, ForeignKey, DataType } from 'sequelize-typescript'
import { Job } from './job.model';
import { Profile } from './profile.model';

@Table
export class Contract extends Model {

    @Column
    terms: string;

    @Column(new DataType.ENUM('new', 'in_progress', 'terminated'))
    status: string;

    @ForeignKey(() => Profile)
    @Column
    ContractorId: number

    @ForeignKey(() => Profile)
    @Column
    ClientId: number

    @BelongsTo(() => Profile, 'ContractorId')
    Contractor: Profile;

    @BelongsTo(() => Profile, 'ClientId')
    Client: Profile;

    @HasMany(() => Job)
    jobs: Job[];

}