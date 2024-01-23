import { Injectable } from '@nestjs/common';
import { HashUseCase } from './hash.use-case';

@Injectable()
export class LoginUseCase {
  constructor(private readonly hashUseCase: HashUseCase) {}

  async run() {
    return await this.hashUseCase.hash('oe');
  }
}
