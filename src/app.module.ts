import { AuthModule } from '@auth/infrastructure/auth.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthModule],
})
export class AppModule {}
