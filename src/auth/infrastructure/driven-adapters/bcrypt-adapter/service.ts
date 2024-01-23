import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IHash } from '@auth/domain/interfaces/hash.interface';

@Injectable()
export class BcryptAdapter implements IHash {
  async hash(payload: string): Promise<string> {
    return await bcrypt.hash(payload, 10);
  }

  async compare(payload: string, hashedPayload: string): Promise<boolean> {
    return await bcrypt.compare(payload, hashedPayload);
  }
}
