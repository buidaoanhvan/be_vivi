import { Controller, UseGuards, Req, Get, Put, Body } from '@nestjs/common';
import { NguoiDungService } from './nguoi-dung.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UpdateNguoiDungDto } from './dto/update-nguoidung.dto';

@Controller('nguoi-dung')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class NguoiDungController {
  constructor(private readonly nguoiDungService: NguoiDungService) {}

  @ApiTags('Cập Nhật Thông Tin Người Dùng')
  @Put('update')
  async update(
    @Req() req: any,
    @Body() updateNguoiDungDto: UpdateNguoiDungDto,
  ) {
    console.log(req.user.id);
    return req.user;
  }
}
