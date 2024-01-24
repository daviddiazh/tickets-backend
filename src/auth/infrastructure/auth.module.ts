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
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './entry-points/strategy/jwt-strategy';

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
    AuthDBRepository,

    // JwtStrategy,

    // {
    //   inject: [JwtStrategy],
    //   provide: LoginUseCase,
    //   useFactory: (hashAdapter: HashUseCase, dbAdapter: DBUseCase) =>
    //     new EnrollmentUseCase(hashAdapter, dbAdapter),
    // },
    {
      inject: [BcryptAdapter, JwtService, AuthDBRepository],
      provide: LoginUseCase,
      useFactory: (
        hashAdapter: HashUseCase,
        jwtService: JwtService,
        dbAdapter: DBUseCase,
      ) => new LoginUseCase(hashAdapter, jwtService, dbAdapter),
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
