import { Test, TestingModule } from '@nestjs/testing';
import { SysParamService } from './sys-param.service';

describe('SysParamService', () => {
  let service: SysParamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SysParamService],
    }).compile();

    service = module.get<SysParamService>(SysParamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
