import { PartialType } from '@nestjs/swagger';
import { LoginAuthDto } from './login-auth.dto';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
  @ApiProperty({
    type: String,
    example: '',
  })
  @IsNotEmpty()
  ten_nguoi_dung: string;
}
