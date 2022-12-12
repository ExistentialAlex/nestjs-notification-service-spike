import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('NotificationValue')
export class NotificationValueEntity {
  @PrimaryColumn()
  NotificationValueID: number;

  @Column()
  NotificationKey: string;

  @Column()
  NotificationValue: string;

  @Column()
  NotificationID: number;
}
