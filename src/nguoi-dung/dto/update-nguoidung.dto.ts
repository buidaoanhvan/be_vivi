import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNguoiDungDto {
  @ApiProperty({ type: String, example: '' })
  @IsString()
  ten_nguoi_dung: string;
}
