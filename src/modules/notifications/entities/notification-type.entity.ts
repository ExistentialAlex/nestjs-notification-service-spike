import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('NotificationType')
export class NotificationTypeEntity {
  @PrimaryColumn()
  NotificationTypeID: number;

  @Column()
  Description: string;

  @Column({ nullable: true })
  HeaderTemplate: string;

  @Column()
  BodyTemplate: string;

  @Column({ nullable: true })
  AlternativeBodyTemplate: string;

  @Column()
  DeliveryType: number;

  @Column({ nullable: true })
  AttachmentName: string;
}
