import { Module } from '@nestjs/common';
import { NguoiDungService } from './nguoi-dung.service';
import { NguoiDungController } from './nguoi-dung.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [NguoiDungController],
  providers: [NguoiDungService],
  imports: [PrismaModule],
})
export class NguoiDungModule {}
