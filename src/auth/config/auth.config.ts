import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  secret: process.env.JWT_TOKEN_SECRET,
  expireIn: parseInt(process.env.JWT_TOKEN_EXPIRE ?? '3600', 10),
  audiance: process.env.JWT_TOKEN_AUDIANCE,
  issuer: process.env.JWT_TOKEN_ISSSUER,
}));
