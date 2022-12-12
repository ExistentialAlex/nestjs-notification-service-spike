import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationDestinationUserGroupEntity } from './entities/notification-destination-user-group.entity';
import { NotificationTypeEntity } from './entities/notification-type.entity';
import { NotificationValueEntity } from './entities/notification-value.entity';
import { NotificationEntity } from './entities/notification.entity';
import { NotificationDestinationUserGroupService } from './services/notification-destination-user-group.service';
import { NotificationTypeService } from './services/notification-type.service';
import { NotificationValueService } from './services/notification-value.service';
import { NotificationService } from './services/notification.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NotificationEntity,
      NotificationTypeEntity,
      NotificationDestinationUserGroupEntity,
      NotificationValueEntity,
    ]),
  ],
  providers: [
    NotificationService,
    NotificationTypeService,
    NotificationDestinationUserGroupService,
    NotificationValueService,
  ],
  exports: [
    TypeOrmModule,
    NotificationService,
    NotificationTypeService,
    NotificationDestinationUserGroupService,
    NotificationValueService,
  ],
})
export class NotificationsModule {}
