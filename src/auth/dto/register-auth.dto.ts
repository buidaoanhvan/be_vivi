import { PartialType } from '@nestjs/swagger';
import { LoginAuthDto } from './login-auth.dto';
import { IsDateString, IsDefined, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
  @ApiProperty({ type: String, example: '' })
  @IsDefined({
    message: "Vui lòng nhập tên người dùng."
  })
  ten_nguoi_dung: string;

  @ApiProperty({ type: Date, example: '' })
  @IsDateString()
  @IsDefined({
    message: "Vui lòng nhập ngày tháng năm sinh."
  })
  ngay_sinh: Date;

  @ApiProperty({ type: Number, example: '0-NAM, 1-NU' })
  @IsNumber()
  @IsDefined({
    message: "Vui lòng nhập giới tính."
  })
  gioi_tinh: number;
}
