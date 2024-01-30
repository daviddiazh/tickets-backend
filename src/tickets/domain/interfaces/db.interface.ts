export interface IDB {
  findById: (_id: any) => Promise<any>;
  findOne: (where: any) => Promise<any>;
  find: (where?: any) => Promise<any[]>;
  insert<T>(payload: T): Promise<T>;
  update<T>(where: any, payload: T): Promise<T>;
  findByLatestInsert?: () => Promise<any>;
  listenForChanges?: () => Promise<any>;
}
