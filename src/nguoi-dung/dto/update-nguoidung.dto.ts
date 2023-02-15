import { IsAlpha, IsDateString, IsNotEmpty, IsNumber, IsString, } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNguoiDungDto {
  @ApiProperty({ type: String, example: '' })
  @IsString()
  ten_nguoi_dung: string;

  @ApiProperty({ type: Number, example: '' })
  @IsNumber()
  gioi_tinh: number;

  @ApiProperty({ type: Date, example: '' })
  @IsDateString()
  ngay_sinh: Date;
}
