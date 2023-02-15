import { Controller, UseGuards, Req, Get, Put, Body, ValidationPipe, UsePipes } from '@nestjs/common';
import { NguoiDungService } from './nguoi-dung.service';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UpdateNguoiDungDto } from './dto/update-nguoidung.dto';

@Controller('nguoi-dung')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class NguoiDungController {
  constructor(private readonly nguoiDungService: NguoiDungService) { }

  @ApiTags('Cập Nhật Thông Tin Người Dùng')
  @Put('update')
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  async update(
    @Req() req: any,
    @Body() updateNguoiDungDto: UpdateNguoiDungDto,
  ) {
    const nguoi_dung = await this.nguoiDungService.updateInfoById(req.user.id, updateNguoiDungDto)
    console.log(nguoi_dung);
  }
}
