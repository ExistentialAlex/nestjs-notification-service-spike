import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { SysParamEntity } from '../entities/sys-param.entity';
@Injectable()
export class SysParamService {
  constructor(
    @InjectRepository(SysParamEntity)
    private sysParamsRepository: Repository<SysParamEntity>,
  ) {}

  findAll(): Promise<SysParamEntity[]> {
    return this.sysParamsRepository.find();
  }

  findOne(where: FindOptionsWhere<SysParamEntity>): Promise<SysParamEntity> {
    return this.sysParamsRepository.findOne({ where });
  }

  find(
    where:
      | FindOptionsWhere<SysParamEntity>
      | FindOptionsWhere<SysParamEntity>[],
  ): Promise<SysParamEntity[]> {
    return this.sysParamsRepository.find({ where });
  }
}
