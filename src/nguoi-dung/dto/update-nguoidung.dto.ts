import { IsDateString, IsNumber, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNguoiDungDto {
  @ApiProperty({ type: String, example: '' })
  @IsString()
  @Length(6)
  ten_nguoi_dung: string;

  @ApiProperty({ type: Number, example: '' })
  @IsNumber()
  gioi_tinh: number;

  @ApiProperty({ type: Date, example: '' })
  @IsDateString()
  ngay_sinh: Date;
}
