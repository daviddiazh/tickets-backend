import { Injectable, Logger } from '@nestjs/common';
import { HashUseCase } from './hash.use-case';

@Injectable()
export class EnrollmentUseCase {
  constructor(private readonly hashUseCase: HashUseCase) {}

  private readonly logger = new Logger('LoginUseCase');

  async apply() {
    return;
  }
}
