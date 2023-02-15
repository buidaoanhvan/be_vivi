import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from '../auth/dto/register-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginAuthDto } from '../auth/dto/login-auth.dto';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment';
import { UpdateNguoiDungDto } from './dto/update-nguoidung.dto';

@Injectable()
export class NguoiDungService {
  constructor(private prisma: PrismaService) { }

  async create(registerAuthDto: RegisterAuthDto) {
    const { ten_nguoi_dung, email, mat_khau, ngay_sinh, gioi_tinh } =
      registerAuthDto;
    const existingUser = await this.prisma.nguoi_dung.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new HttpException('Người dùng đã tồn tại!', HttpStatus.BAD_REQUEST);
    }
    console.log(moment().format());
    const hashedPassword = await bcrypt.hash(mat_khau, 10);
    const nguoi_dung = await this.prisma.nguoi_dung.create({
      data: {
        ten_nguoi_dung,
        email,
        mat_khau: hashedPassword,
        ngay_sinh: moment.utc(ngay_sinh, 'YYYY-MM-DD').toDate(),
        gioi_tinh,
        trang_thai: 0,
        ngay_tao: moment().format(),
      },
    });
    return nguoi_dung;
  }

  async findByLogin(loginAuthDto: LoginAuthDto) {
    const { email, mat_khau } = loginAuthDto;
    const nguoi_dung = await this.prisma.nguoi_dung.findFirst({
      where: { email },
    });
    if (!nguoi_dung) {
      throw new HttpException('Email không hợp lệ!', HttpStatus.UNAUTHORIZED);
    }
    const passwordMatch = await bcrypt.compare(mat_khau, nguoi_dung.mat_khau);
    if (!passwordMatch) {
      throw new HttpException('Mật khẩu không đúng!!', HttpStatus.UNAUTHORIZED);
    }
    return nguoi_dung;
  }

  async findByPayload(payload: any) {
    const { email } = payload;
    const nguoi_dung = await this.prisma.nguoi_dung.findFirst({
      where: { email },
    });
    return nguoi_dung;
  }

  async updateInfoById(id: number, updateNguoiDungDto: UpdateNguoiDungDto) {

    if (updateNguoiDungDto.ngay_sinh) {
      updateNguoiDungDto.ngay_sinh = moment.utc(updateNguoiDungDto.ngay_sinh, 'YYYY-MM-DD').toDate()
    }

    const nguoi_dung = await this.prisma.nguoi_dung.update({
      where: { id },
      data: updateNguoiDungDto
    })
    return nguoi_dung
  }
}
