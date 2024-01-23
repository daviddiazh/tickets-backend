import { Module } from '@nestjs/common';
import { LoginController } from './entry-points/login.controller';
import { LoginUseCase } from '@auth/application/use-cases/login.use-case';
import { BcryptAdapter } from './driven-adapters/bcrypt-adapter/service';
import { HashUseCase } from '@auth/application/use-cases/hash.use-case';

@Module({
  imports: [],
  providers: [
    BcryptAdapter,
    {
      inject: [BcryptAdapter],
      provide: LoginUseCase,
      useFactory: (hashAdapter: HashUseCase) => new LoginUseCase(hashAdapter),
    },
  ],
  controllers: [LoginController],
})
export class AuthModule {}
