import { Injectable } from '@nestjs/common';
import { DBUseCase } from './db.use-case';

@Injectable()
export class LogoutUseCase {
  constructor(private readonly db: DBUseCase) {}

  async apply(_id: any) {
    await this.db.update(_id, { online: false });

    return {
      logout: true,
    };
  }
}
