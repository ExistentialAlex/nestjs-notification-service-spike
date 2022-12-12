import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { ClientContactEntity } from '../entities/client-contact.entity';
@Injectable()
export class ClientContactService {
  constructor(
    @InjectRepository(ClientContactEntity)
    private clientContactsRepository: Repository<ClientContactEntity>,
  ) {}

  findAll(): Promise<ClientContactEntity[]> {
    return this.clientContactsRepository.find();
  }

  findOne(
    where: FindOptionsWhere<ClientContactEntity>,
  ): Promise<ClientContactEntity> {
    return this.clientContactsRepository.findOne({ where });
  }

  find(
    where:
      | FindOptionsWhere<ClientContactEntity>
      | FindOptionsWhere<ClientContactEntity>[],
  ): Promise<ClientContactEntity[]> {
    return this.clientContactsRepository.find({ where });
  }
}
