import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NguoiDungService } from '../nguoi-dung/nguoi-dung.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, NguoiDungService, JwtStrategy],
  imports: [PrismaModule],
})
export class AuthModule {}
