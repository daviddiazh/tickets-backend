import { Injectable, Logger } from '@nestjs/common';
import { HashUseCase } from './hash.use-case';
import { ILogin } from '@auth/domain/interfaces/login.interface';

@Injectable()
export class LoginUseCase {
  constructor(private readonly hashUseCase: HashUseCase) {}

  private readonly logger = new Logger('LoginUseCase');

  async apply(payload: ILogin) {
    const hash = await this.hashUseCase.hash(payload.password);
    this.logger.log({ hash });
  }
}
