import { Job } from "../models/job.model";
export declare const findAllUnpaidJobs: () => Promise<Job[]>;
export declare const payJob: (jobId: any) => Promise<boolean>;
