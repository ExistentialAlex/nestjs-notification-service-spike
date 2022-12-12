import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('NotificationDestinationUserGroup')
export class NotificationDestinationUserGroupEntity {
  @PrimaryColumn()
  NotificationID: number;

  @Column()
  UserID: string;
}
