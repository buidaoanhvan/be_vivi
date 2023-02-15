import { PartialType } from '@nestjs/swagger';
import { LoginAuthDto } from './login-auth.dto';
import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
  @ApiProperty({ type: String, example: '' })
  @IsNotEmpty()
  ten_nguoi_dung: string;

  @ApiProperty({ type: Date, example: '' })
  @IsDateString()
  @IsNotEmpty()
  ngay_sinh: Date;

  @ApiProperty({ type: Number, example: '0-NAM, 1-NU' })
  @IsNumber()
  @IsNotEmpty()
  gioi_tinh: number;
}
