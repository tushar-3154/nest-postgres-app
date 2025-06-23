import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { HashingProvider } from './hashing.provider';

@Injectable()
export class BcryptProvider implements HashingProvider {
  public async hashPassword(password: string | Buffer): Promise<string> {
    const salt = await bcrypt.genSalt();

    return await bcrypt.hash(password.toString(), salt);
  }

  public async comparePassword(
    plainPassword: string | Buffer,
    hashedPassword: string | Buffer,
  ): Promise<boolean> {
    const plain = plainPassword.toString();
    const hashed = hashedPassword.toString();

    return await bcrypt.compare(plain, hashed);
  }
}
