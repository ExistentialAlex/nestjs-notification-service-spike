import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { NotificationDestinationUserGroupEntity } from '../entities/notification-destination-user-group.entity';

@Injectable()
export class NotificationDestinationUserGroupService {
  constructor(
    @InjectRepository(NotificationDestinationUserGroupEntity)
    private notificationRepository: Repository<NotificationDestinationUserGroupEntity>,
  ) {}

  findAll(): Promise<NotificationDestinationUserGroupEntity[]> {
    return this.notificationRepository.find();
  }

  find(
    where:
      | FindOptionsWhere<NotificationDestinationUserGroupEntity>
      | FindOptionsWhere<NotificationDestinationUserGroupEntity>[],
  ): Promise<NotificationDestinationUserGroupEntity[]> {
    return this.notificationRepository.find({ where });
  }

  findOne(
    where: FindOptionsWhere<NotificationDestinationUserGroupEntity>,
  ): Promise<NotificationDestinationUserGroupEntity> {
    return this.notificationRepository.findOne({ where });
  }

  add(data: NotificationDestinationUserGroupEntity) {
    return this.notificationRepository.insert(data);
  }

  update(
    data:
      | NotificationDestinationUserGroupEntity
      | NotificationDestinationUserGroupEntity[],
  ) {
    if (Array.isArray(data)) {
      return this.notificationRepository.save(data);
    }

    return this.notificationRepository.save(data);
  }
}
