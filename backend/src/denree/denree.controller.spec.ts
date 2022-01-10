import { Test, TestingModule } from '@nestjs/testing';
import { DenreeController } from './denree.controller';
import { DenreeService } from './denree.service';

describe('DenreeController', () => {
  let controller: DenreeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DenreeController],
      providers: [DenreeService],
    }).compile();

    controller = module.get<DenreeController>(DenreeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
