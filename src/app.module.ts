import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '@auth/infrastructure/auth.module';
import envConfig from '@shared/config/env';
import { TicketsModule } from '@tickets/infrastructure/tickets.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [envConfig],
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof envConfig>) => {
        const { url } = configService.mongo;

        return { uri: url };
      },
      inject: [envConfig.KEY],
    }),
    AuthModule,
    TicketsModule,
  ],
})
export class AppModule {}
