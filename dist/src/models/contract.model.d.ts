import { Model } from 'sequelize-typescript';
import { Job } from './job.model';
import { Profile } from './profile.model';
export declare class Contract extends Model {
    terms: string;
    status: string;
    ContractorId: number;
    ClientId: number;
    Contractor: Profile;
    Client: Profile;
    jobs: Job[];
}
