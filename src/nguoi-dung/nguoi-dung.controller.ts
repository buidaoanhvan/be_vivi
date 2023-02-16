import { Controller, UseGuards, Req, Put, Body } from '@nestjs/common';
import { NguoiDungService } from './nguoi-dung.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UpdateNguoiDungDto } from './dto/update-nguoidung.dto';
import { NguoiDungDTO } from './dto/nguoidung.dto';
import { plainToClass } from 'class-transformer';
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
    const nguoi_dung = await this.nguoiDungService.updateInfoById(
      req.user.id,
      updateNguoiDungDto,
    );
    return plainToClass(NguoiDungDTO, nguoi_dung);
  }
}
