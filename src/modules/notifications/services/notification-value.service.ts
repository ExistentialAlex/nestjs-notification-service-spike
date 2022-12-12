import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { NotificationValueEntity } from '../entities/notification-value.entity';

@Injectable()
export class NotificationValueService {
  constructor(
    @InjectRepository(NotificationValueEntity)
    private notificationValueRepository: Repository<NotificationValueEntity>,
  ) {}

  findAll(): Promise<NotificationValueEntity[]> {
    return this.notificationValueRepository.find();
  }

  find(
    where:
      | FindOptionsWhere<NotificationValueEntity>
      | FindOptionsWhere<NotificationValueEntity>[],
  ): Promise<NotificationValueEntity[]> {
    return this.notificationValueRepository.find({ where });
  }

  findOne(
    where: FindOptionsWhere<NotificationValueEntity>,
  ): Promise<NotificationValueEntity> {
    return this.notificationValueRepository.findOne({ where });
  }

  add(data: NotificationValueEntity) {
    return this.notificationValueRepository.insert(data);
  }

  update(data: NotificationValueEntity | NotificationValueEntity[]) {
    if (Array.isArray(data)) {
      return this.notificationValueRepository.save(data);
    }

    return this.notificationValueRepository.save(data);
  }
}
