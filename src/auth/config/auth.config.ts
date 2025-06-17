import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  shareSecret: process.env.SECRET_KEY,
}));
