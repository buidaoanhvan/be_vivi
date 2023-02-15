import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { NguoiDungModule } from './nguoi-dung/nguoi-dung.module';

@Module({
  imports: [PrismaModule, AuthModule, NguoiDungModule],
})
export class AppModule {}
