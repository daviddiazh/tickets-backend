import { Injectable } from '@nestjs/common';
import { IDB } from '@auth/domain/interfaces/db.interface';

@Injectable()
export class DBUseCase implements IDB {
  constructor(private readonly dbUseCase: IDB) {}

  async findOne(where: any): Promise<any> {
    return await this.dbUseCase.findOne(where);
  }

  async find(where?: any): Promise<any[]> {
    return await this.dbUseCase.find(where);
  }

  async insert<T>(payload: T): Promise<T> {
    return await this.dbUseCase.insert(payload);
  }

  async update<T>(where: any, payload: T): Promise<T> {
    return await this.dbUseCase.update(where, payload);
  }
}
