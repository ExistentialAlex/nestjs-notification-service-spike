import { Test, TestingModule } from '@nestjs/testing';
import { NotificationValueService } from './notification-value.service';

describe('NotificationValueService', () => {
  let service: NotificationValueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationValueService],
    }).compile();

    service = module.get<NotificationValueService>(NotificationValueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
