import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { HashUseCase } from './hash.use-case';
import { ILogin } from '@auth/domain/interfaces/login.interface';
import { JwtService } from '@nestjs/jwt';
import { DBUseCase } from './db.use-case';
import { IUser } from '@auth/domain/interfaces/user.interface';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly hash: HashUseCase,
    private readonly jwtService: JwtService,
    private readonly db: DBUseCase,
  ) {}

  private readonly logger = new Logger('LoginUseCase');

  async apply(payload: ILogin) {
    try {
      const { email, password: passwordReq } = payload;

      const user: IUser = await this.db.findOne({ email });

      const isMatchPasswords = this.hash.compare(passwordReq, user.password);

      if (!isMatchPasswords) {
        throw new BadRequestException('Revisa los datos por favor');
      }

      await this.db.update({ _id: user._id }, { online: true });

      return {
        user: {
          ...user,
          online: true,
          password: null,
        },
        token: this.jwtService.sign({ _id: user?._id + '' }),
      };
    } catch (error) {
      this.logger.error('Error al loguearse, ' + error);
      throw error;
    }
  }
}
