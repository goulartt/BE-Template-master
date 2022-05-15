import { Job } from "../models/job.model";
export declare const depositMoney: (clientId: any, amountToDeposity: any) => Promise<[affectedCount: number]>;
export declare const bestProfissional: (start: any, end: any) => Promise<Job[]>;
export declare const clientsPaidsTheMost: (start: any, end: any, limit?: number) => Promise<Job[]>;
