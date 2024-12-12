import { IUser } from "./IUser";

export interface IEvent {
  _id: string;
  name: string;
  description: string;
  isApprove: boolean;
  event_date: string;
  createdBy: IUser;
  participants: string[];
  isActive: boolean;
  created: string;
  updated: string;
  __v: number;
}
