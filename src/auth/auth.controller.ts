import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { NguoiDungService } from 'src/nguoi-dung/nguoi-dung.service';
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private nguoiDungService: NguoiDungService,
  ) {}

  @ApiTags('Đăng Nhập')
  @Post('login')
  async login(@Body() loginAuthDto: LoginAuthDto) {
    const nguoi_dung = await this.nguoiDungService.findByLogin(loginAuthDto);
    const payload = {
      id: nguoi_dung.id,
      email: nguoi_dung.email,
    };
    const token = await this.authService.signPayload(payload);
    delete nguoi_dung.mat_khau;
    return {
      nguoi_dung,
      token,
    };
  }

  @ApiTags('Đăng Ký')
  @Post('register')
  async register(@Body() registerAuthDto: RegisterAuthDto) {
    const nguoi_dung = await this.nguoiDungService.create(registerAuthDto);
    const payload = {
      id: nguoi_dung.id,
      email: nguoi_dung.email,
    };
    const token = await this.authService.signPayload(payload);
    delete nguoi_dung.mat_khau;
    return {
      nguoi_dung,
      token,
    };
  }
}
