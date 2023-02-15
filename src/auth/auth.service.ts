import { NguoiDungService } from 'src/nguoi-dung/nguoi-dung.service';
import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
@Injectable()
export class AuthService {
  constructor(private nguoiDung: NguoiDungService) {}
  async signPayload(payload: any) {
    const token = sign(payload, process.env.SECRET_KEY, { expiresIn: '12h' });
    return token;
  }

  async validateUser(payload: any) {
    return await this.nguoiDung.findByPayload(payload);
  }
}
