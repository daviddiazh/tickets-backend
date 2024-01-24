export interface IDB {
  findOne: (where: any) => Promise<any>;
  find: (where?: any) => Promise<any[]>;
  insert<T>(payload: T): Promise<T>;
  update<T>(where: any, payload: T): Promise<T>;
}
