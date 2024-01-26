import { Step } from '../enums/status.enum';

export interface IQueueTicket {
  _id?: any;
  managementBy?: any;
  ticket: string;
  step: Step;
  consecutive: number;
  createdAt?: Date;
  updatedAt?: Date;
}
