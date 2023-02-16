import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiExcludeEndpoint,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { extname, join } from 'path';
import * as fs from 'fs-extra';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiExcludeEndpoint()
  @Get('public')
  serveStatic(): string {
    return;
  }

  @ApiTags('Tải Hình Ảnh Lên')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = join(__dirname, '..', '/public/img');
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          cb(null, `${uuidv4()}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: true,
      }),
    )
    file: Express.Multer.File,
  ) {
    if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
      return {
        message: 'Tải hình ảnh thành công.',
        path: '/public/img/' + file.filename,
      };
    } else {
      fs.unlink(file.path);
      throw new HttpException('Hình ảnh không hợp lệ.', HttpStatus.BAD_REQUEST);
    }
  }
}
