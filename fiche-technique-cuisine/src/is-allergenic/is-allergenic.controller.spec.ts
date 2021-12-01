import { Test, TestingModule } from '@nestjs/testing';
import { IsAllergenicController } from './is-allergenic.controller';
import { IsAllergenicService } from './is-allergenic.service';

describe('IsAllergenicController', () => {
  let controller: IsAllergenicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IsAllergenicController],
      providers: [IsAllergenicService],
    }).compile();

    controller = module.get<IsAllergenicController>(IsAllergenicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
