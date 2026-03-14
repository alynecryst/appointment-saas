import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentBlocksService } from './appointment-blocks.service';

describe('AppointmentBlocksService', () => {
  let service: AppointmentBlocksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppointmentBlocksService],
    }).compile();

    service = module.get<AppointmentBlocksService>(AppointmentBlocksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
