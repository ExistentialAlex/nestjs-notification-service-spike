import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { NotificationEntity } from '../entities/notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationEntity)
    private notificationRepository: Repository<NotificationEntity>,
  ) {}

  findAll(): Promise<NotificationEntity[]> {
    return this.notificationRepository.find();
  }

  find(
    where:
      | FindOptionsWhere<NotificationEntity>
      | FindOptionsWhere<NotificationEntity>[],
  ): Promise<NotificationEntity[]> {
    return this.notificationRepository.find({ where });
  }

  findOne(
    where: FindOptionsWhere<NotificationEntity>,
  ): Promise<NotificationEntity> {
    return this.notificationRepository.findOne({ where });
  }

  add(data: NotificationEntity) {
    return this.notificationRepository.insert(data);
  }

  update(data: NotificationEntity | NotificationEntity[]) {
    if (Array.isArray(data)) {
      return this.notificationRepository.save(data);
    }

    return this.notificationRepository.save(data);
  }
}
