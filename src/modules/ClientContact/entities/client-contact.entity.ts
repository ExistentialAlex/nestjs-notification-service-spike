import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('ClientContact')
export class ClientContactEntity {
  @PrimaryColumn()
  ClientContactID: number;

  @Column()
  FirstName: string;

  @Column()
  LastName: string;

  @Column({ nullable: true })
  Email: string;

  @Column({ nullable: true })
  PhoneNumber: string;

  @Column({ nullable: true })
  SalesForceID: string;

  @Column({ nullable: true })
  CreatedByUserID: string;

  @Column({ nullable: true })
  CreatedDateTime: Date;

  @Column({ nullable: true })
  UpdatedByUserID: string;

  @Column({ nullable: true })
  UpdatedDateTime: Date;
}
