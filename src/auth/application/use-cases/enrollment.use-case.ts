import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { IEnrollment } from '@auth/domain/interfaces/enrollment.interface';
import { HashUseCase } from './hash.use-case';
import { DBUseCase } from './db.use-case';

@Injectable()
export class EnrollmentUseCase {
  constructor(
    private readonly hashUseCase: HashUseCase,
    private readonly dbUseCase: DBUseCase,
  ) {}

  private readonly logger = new Logger('EnrollmentUseCase');

  async apply(payload: IEnrollment) {
    try {
      const user = await this.dbUseCase.findOne({ email: payload.email });

      if (user) throw new BadRequestException('Verifica los datos por favor');

      const passwordEncrypted = await this.hashUseCase.hash(payload.password);

      await this.dbUseCase.insert({
        ...payload,
        password: passwordEncrypted,
      });

      this.logger.log('User created!');

      return {
        enrolled: true,
      };
    } catch (error) {
      this.logger.error('Error al crear el usuario, ' + error);
      throw error;
    } finally {
      this.logger.log('Enrollment ended');
    }
  }
}
