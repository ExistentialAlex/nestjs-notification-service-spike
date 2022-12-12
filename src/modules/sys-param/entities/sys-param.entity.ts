import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('SysParam')
export class SysParamEntity {
  @PrimaryColumn()
  ParamKey: string;

  @Column()
  ParamValue: string;
}
