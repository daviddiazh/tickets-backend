import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LoginUseCase } from '@auth/application/use-cases/login.use-case';
import { HashUseCase } from '@auth/application/use-cases/hash.use-case';
import { EnrollmentUseCase } from '@auth/application/use-cases/enrollment.use-case';
import { DBUseCase } from '@auth/application/use-cases/db.use-case';
import { BcryptAdapter } from './driven-adapters/bcrypt-adapter/service';
import { LoginController } from './entry-points/controllers/login.controller';
import { EnrollmentController } from './entry-points/controllers/enrollment.controller';
import { AuthMongoDBRepository } from './driven-adapters/mongodb-adapter/repository';
import { AuthSchema } from './driven-adapters/mongodb-adapter/schema';
import { JwtStrategy } from './entry-points/strategy/jwt-strategy';
import { LogoutController } from './entry-points/controllers/logout.controller';
import { LogoutUseCase } from '@auth/application/use-cases/logout.use-case';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: 'Auth', schema: AuthSchema }]),

    PassportModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET') || '',
          signOptions: {
            expiresIn: '2h',
          },
        };
      },
    }),
  ],
  providers: [
    BcryptAdapter,
    AuthMongoDBRepository,
    JwtStrategy,

    {
      inject: [AuthMongoDBRepository],
      provide: JwtStrategy,
      useFactory: (dbAdapter: DBUseCase) => {
        new JwtStrategy(dbAdapter);
      },
    },
    {
      inject: [BcryptAdapter, JwtService, AuthMongoDBRepository],
      provide: LoginUseCase,
      useFactory: (
        hashAdapter: HashUseCase,
        jwtService: JwtService,
        dbAdapter: DBUseCase,
      ) => new LoginUseCase(hashAdapter, jwtService, dbAdapter),
    },
    {
      inject: [BcryptAdapter, AuthMongoDBRepository],
      provide: EnrollmentUseCase,
      useFactory: (hashAdapter: HashUseCase, dbAdapter: DBUseCase) =>
        new EnrollmentUseCase(hashAdapter, dbAdapter),
    },
    {
      inject: [AuthMongoDBRepository],
      provide: LogoutUseCase,
      useFactory: (dbAdapter: DBUseCase) => new LogoutUseCase(dbAdapter),
    },
  ],
  controllers: [LoginController, EnrollmentController, LogoutController],
})
export class AuthModule {}
