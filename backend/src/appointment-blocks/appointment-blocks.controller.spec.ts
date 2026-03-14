import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentBlocksController } from './appointment-blocks.controller';

describe('AppointmentBlocksController', () => {
  let controller: AppointmentBlocksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentBlocksController],
    }).compile();

    controller = module.get<AppointmentBlocksController>(AppointmentBlocksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
