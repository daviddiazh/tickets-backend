import { Injectable } from '@nestjs/common';
import { DBUseCase } from './db.use-case';
import { Step } from '@tickets/domain/enums/status.enum';

@Injectable()
export class FindTicketsOnManagementUseCase {
  constructor(private readonly db: DBUseCase) {}

  async apply() {
    try {
      return await this.db.find({ step: Step.MANAGEMENT });
    } catch (error) {
      console.log('error to find tickets');
    }
  }
}
