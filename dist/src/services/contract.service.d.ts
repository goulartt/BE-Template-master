import { Contract } from "../models/contract.model";
export declare const findContractyById: (id: any) => Promise<Contract>;
export declare const findAllNonTerminatedContracts: () => Promise<Contract[]>;
