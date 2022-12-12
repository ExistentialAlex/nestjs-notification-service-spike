import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('User')
export class UserEntity {
  @PrimaryColumn()
  Id: string;

  @Column()
  FirstName: string;

  @Column()
  LastName: string;

  @Column()
  Level: number;

  @Column()
  JoinDate: Date;

  @Column({ nullable: true })
  Email: string;

  @Column()
  EmailConfirmed: boolean;

  @Column({ nullable: true })
  PasswordHash: string;

  @Column({ nullable: true })
  SecurityStamp: string;

  @Column({ nullable: true })
  PhoneNumber: string;

  @Column()
  PhoneNumberConfirmed: boolean;

  @Column()
  TwoFactorEnabled: boolean;

  @Column({ nullable: true })
  LockoutEndDateUtc: Date;

  @Column()
  LockoutEnabled: boolean;

  @Column()
  AccessFailedCount: number;

  @Column()
  UserName: string;

  @Column()
  UserType: number;

  @Column()
  IsActive: boolean;

  @Column({ nullable: true })
  CreatedBy: string;

  @Column({ nullable: true })
  CreatedDate: Date;

  @Column({ nullable: true })
  LastUpdatedBy: string;

  @Column({ nullable: true })
  LastUpdatedDate: Date;

  @Column()
  IsCaria: boolean;

  @Column()
  IsArchived: boolean;

  @Column()
  HasAcceptedTerms: boolean;

  @Column({ nullable: true })
  LastLogonDateTime: Date;

  @Column({ nullable: true })
  TrialPeriodInDays: number;

  @Column({ nullable: true })
  CompanyName: string;

  @Column({ nullable: true })
  TrialPeriodStart: Date;

  @Column({ nullable: true })
  DisabledDate: Date;

  @Column()
  AutoArchive: boolean;

  @Column()
  CountryId: number;

  @Column()
  HasCreateEvalPermission: boolean;

  @Column({ nullable: true })
  CreateEvalStartDate: Date;

  @Column({ nullable: true })
  CreateEvalEndDate: Date;

  @Column()
  ResidenceCountryId: number;

  @Column({ nullable: true })
  NormalizedUserName: string;

  @Column({ nullable: true })
  NormalizedEmail: string;
}
