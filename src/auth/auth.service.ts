import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import * as moment from 'moment';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(loginAuthDto: LoginAuthDto) {
    const nguoi_dung = await this.prisma.nguoi_dung.findFirst({
      where: { email: loginAuthDto.email },
    });

    if (!nguoi_dung) {
      throw new HttpException('Email không hợp lệ!', HttpStatus.UNAUTHORIZED);
    }

    const isMatch = await bcrypt.compare(
      loginAuthDto.mat_khau,
      nguoi_dung.mat_khau,
    );

    if (isMatch) {
      return 'Đăng nhập thành công!';
    } else {
      throw new HttpException(
        'Mật khẩu của bạn không đúng!',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async register(registerDto: RegisterAuthDto) {
    const { email, mat_khau, ten_nguoi_dung } = registerDto;
    const lower_case_email = email.toLowerCase();
    const hashed_password = await bcrypt.hash(mat_khau, 10);

    const nguoi_dung = await this.prisma.nguoi_dung.findFirst({
      where: { email: lower_case_email },
    });

    if (nguoi_dung) {
      throw new HttpException(
        'Người dùng đã tồn tại trong hệ thống!',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const nguoi_dung_register = this.prisma.nguoi_dung.create({
      data: {
        email: lower_case_email,
        ten_nguoi_dung: ten_nguoi_dung,
        mat_khau: hashed_password,
        ngay_tao: moment().format(),
      },
    });

    return nguoi_dung_register;
  }
}
