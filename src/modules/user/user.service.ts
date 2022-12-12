import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  findOne(where: FindOptionsWhere<UserEntity>): Promise<UserEntity> {
    return this.usersRepository.findOne({ where });
  }

  find(
    where: FindOptionsWhere<UserEntity> | FindOptionsWhere<UserEntity>[],
  ): Promise<UserEntity[]> {
    return this.usersRepository.find({ where });
  }
}
