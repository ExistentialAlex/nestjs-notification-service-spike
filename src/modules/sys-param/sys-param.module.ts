import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SysParamEntity } from './entities/sys-param.entity';
import { SysParamService } from './services/sys-param.service';

@Module({
  imports: [TypeOrmModule.forFeature([SysParamEntity])],
  providers: [SysParamService],
  exports: [TypeOrmModule, SysParamService],
})
export class SysParamModule {}
