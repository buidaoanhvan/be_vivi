import { IsDefined, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthDto {
  @ApiProperty({ type: String, example: '', })
  @IsEmail({ allow_display_name: false }, { message: "Địa chỉ email không hợp lệ." })
  @IsDefined({
    message: "Vui lòng nhập địa chỉ email."
  })
  email: string;

  @ApiProperty({ type: String, example: '', })
  @IsDefined({
    message: "Vui lòng nhập mật khẩu."
  })
  mat_khau: string;
}
