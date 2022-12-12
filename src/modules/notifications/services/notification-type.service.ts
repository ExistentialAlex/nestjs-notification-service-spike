import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { NotificationTypeEntity } from '../entities/notification-type.entity';

@Injectable()
export class NotificationTypeService {
  constructor(
    @InjectRepository(NotificationTypeEntity)
    private notificationRepository: Repository<NotificationTypeEntity>,
  ) {}

  findAll(): Promise<NotificationTypeEntity[]> {
    return this.notificationRepository.find();
  }

  find(
    where: FindOptionsWhere<NotificationTypeEntity>,
  ): Promise<NotificationTypeEntity[]> {
    return this.notificationRepository.find({ where });
  }

  findOne(
    where: FindOptionsWhere<NotificationTypeEntity>,
  ): Promise<NotificationTypeEntity> {
    return this.notificationRepository.findOne({ where });
  }

  add(data: NotificationTypeEntity) {
    return this.notificationRepository.insert(data);
  }

  update(data: NotificationTypeEntity | NotificationTypeEntity[]) {
    if (Array.isArray(data)) {
      return this.notificationRepository.save(data);
    }

    return this.notificationRepository.save(data);
  }
}
