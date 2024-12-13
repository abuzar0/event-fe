
export interface IRole {
  _id: string,
  type: string;
  permissions: string[]
  isActive: boolean;
  created: Date;
  updated: Date;
}
