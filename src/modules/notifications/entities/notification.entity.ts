import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Notification')
export class NotificationEntity {
  @PrimaryColumn()
  NotificationID: number;

  @Column()
  Status: number;

  @Column({ nullable: true })
  DestinationUserID: string;

  @Column()
  NotificationType: number;

  @Column({ nullable: true })
  DateCreated: Date;

  @Column({ nullable: true })
  DateSent: Date;

  @Column({ nullable: true })
  ClientContactID: number;
}
