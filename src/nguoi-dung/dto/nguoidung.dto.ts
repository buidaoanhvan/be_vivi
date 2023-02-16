import { Exclude } from 'class-transformer';

export class NguoiDungDTO {
  @Exclude()
  id: number;
  ten_nguoi_dung: string;
  email: string;
  @Exclude()
  mat_khau: string;
  ngay_sinh: Date;
  gioi_tinh: number;
  hinh_anh: string;
  anh_bia: string;
  trang_thai: number;
  ngay_tao: Date;
  ngay_cap_nhat: Date;
  @Exclude()
  token: string;
  @Exclude()
  token_iat: Date;
}
