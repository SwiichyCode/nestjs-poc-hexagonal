import { Injectable } from '@nestjs/common';
import {
  IJwtService,
  IJwtServicePayload,
} from '../../../domain/adapters/jwt.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService implements IJwtService {
  constructor(private readonly jwtService: JwtService) {}

  signAsync(payload: IJwtServicePayload) {
    return this.jwtService.signAsync(payload);
  }
}
