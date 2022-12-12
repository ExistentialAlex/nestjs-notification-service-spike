import { Test, TestingModule } from '@nestjs/testing';
import { NotificationDestinationUserGroupService } from './notification-destination-user-group.service';

describe('NotificationDestinationUserGroupService', () => {
  let service: NotificationDestinationUserGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationDestinationUserGroupService],
    }).compile();

    service = module.get<NotificationDestinationUserGroupService>(NotificationDestinationUserGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
