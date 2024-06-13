import { Injectable } from '@nestjs/common';
import { hash, compare, genSalt, genSaltSync } from 'bcryptjs';
import { isString } from 'class-validator';
import * as crypto from 'crypto';
import { PASSWORD_SALT_LENGTH } from './constant';

@Injectable()
export class HashService {
  // bcrypt
  async hashPassword(passwordString: string, salt: string): Promise<string> {
    return hash(passwordString, salt);
  }

  async randomSalt(): Promise<string> {
    // Env Variable
    const defaultPasswordSaltLength: number = PASSWORD_SALT_LENGTH;

    return genSalt(defaultPasswordSaltLength);
  }

  async generateHashPassword(password: string): Promise<string> {
    const defaultSalt: number = PASSWORD_SALT_LENGTH;
    const salt = genSaltSync(defaultSalt);

    return hash(password, salt);
  }

  async bcryptComparePassword(
    passwordString: string,
    passwordHashed: string,
  ): Promise<boolean> {
    return compare(passwordString, passwordHashed);
  }

  async encryptAES256Bit(
    data: string | Record<string, any> | Record<string, any>[],
    key: string,
  ): Promise<string> {
    let dataParse: string = data as string;
    if (!isString(data)) {
      dataParse = JSON.stringify(data);
    }
    const cryptoKey = crypto.scryptSync(key, 'salt', 32);

    const iv = crypto.randomBytes(16);
    const algo = 'aes-256-cbc';
    const cipher = crypto.createCipheriv(algo, Buffer.from(cryptoKey), iv);
    let encrypted = cipher.update(dataParse, 'utf8', 'base64');
    encrypted += cipher.final('base64');

    return iv.toString('base64') + ':' + encrypted;
  }

  async decryptAES256Bit(encrypted: string, key: string): Promise<string> {
    const [ivText, encryptedData] = encrypted.split(':');
    const cryptoKey = crypto.scryptSync(key, 'salt', 32);
    const iv = Buffer.from(ivText, 'base64');
    const algo = 'aes-256-cbc';
    const decipher = crypto.createDecipheriv(algo, Buffer.from(cryptoKey), iv);
    let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
