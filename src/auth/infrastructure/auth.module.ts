import { Module } from '@nestjs/common';
import { LoginUseCase } from '@auth/application/use-cases/login.use-case';
import { HashUseCase } from '@auth/application/use-cases/hash.use-case';
import { EnrollmentUseCase } from '@auth/application/use-cases/enrollment.use-case';
import { DBUseCase } from '@auth/application/use-cases/db.use-case';
import { BcryptAdapter } from './driven-adapters/bcrypt-adapter/service';
import { LoginController } from './entry-points/controllers/login.controller';
import { EnrollmentController } from './entry-points/controllers/enrollment.controller';
import { AuthDBRepository } from './driven-adapters/mongodb-adapter/repository';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema } from './driven-adapters/mongodb-adapter/schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Auth', schema: AuthSchema }])],
  providers: [
    BcryptAdapter,
    AuthDBRepository,

    {
      inject: [BcryptAdapter],
      provide: LoginUseCase,
      useFactory: (hashAdapter: HashUseCase) => new LoginUseCase(hashAdapter),
    },
    {
      inject: [BcryptAdapter, AuthDBRepository],
      provide: EnrollmentUseCase,
      useFactory: (hashAdapter: HashUseCase, dbAdapter: DBUseCase) =>
        new EnrollmentUseCase(hashAdapter, dbAdapter),
    },
  ],
  controllers: [LoginController, EnrollmentController],
})
export class AuthModule {}
