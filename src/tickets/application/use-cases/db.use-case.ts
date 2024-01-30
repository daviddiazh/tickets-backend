import { Injectable } from '@nestjs/common';
import { IDB } from '@tickets/domain/interfaces/db.interface';

@Injectable()
export class DBUseCase implements IDB {
  constructor(private readonly dbUseCase: IDB) {}

  async findById(_id: any): Promise<any> {
    return await this.dbUseCase.findById(_id);
  }

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

  async findByLatestInsert() {
    return await this.dbUseCase.findByLatestInsert();
  }

  async listenForChanges() {
    return await this.dbUseCase.listenForChanges();
  }
}
