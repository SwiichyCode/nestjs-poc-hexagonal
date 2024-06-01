export interface IJwtServicePayload {
  sub: number;
  username: string;
  email: string;
}

export interface IJwtService {
  signAsync(payload: IJwtServicePayload): Promise<string>;
  verifyAsync(token: string): Promise<IJwtServicePayload>;
}
