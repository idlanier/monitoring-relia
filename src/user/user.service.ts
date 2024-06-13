import { Injectable, Logger } from '@nestjs/common';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  logger = new Logger('User Service');

  async findOneById(id: string, withPassword?: boolean): Promise<User> {
    try {
      const query = this.userRepository.createQueryBuilder('user');
      query.where('id = :id', { id: id });

      if (withPassword) {
        query.addSelect('user.pin');
      }
      return query.getOne();
    } catch (error: any) {
      this.logger.error(error.message, '', this.constructor.name);
    }
  }

  async findOneByFullname(
    fullname: string,
    withPassword?: boolean,
  ): Promise<User> {
    try {
      const query = this.userRepository.createQueryBuilder('user');
      query.where('fullname = :fullname', { fullname: fullname });

      if (withPassword) {
        query.addSelect('user.pin');
      }

      return query.getOne();
    } catch (error: any) {
      this.logger.error(error.message, '', this.constructor.name);
    }
  }

  async findOneByUsername(
    username: string,
    withPassword?: boolean,
  ): Promise<User> {
    try {
      const query = this.userRepository.createQueryBuilder('user');

      query.where('LOWER(username) = :username', {
        username: username.toLocaleLowerCase(),
      });

      if (withPassword) {
        query.addSelect('user.pin');
      }

      const result = await query.getOne();

      return result;
    } catch (error: any) {
      this.logger.error(error.message, '', this.constructor.name);
    }
  }
}
