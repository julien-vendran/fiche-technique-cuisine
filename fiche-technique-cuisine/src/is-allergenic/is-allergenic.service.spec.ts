import { Test, TestingModule } from '@nestjs/testing';
import { IsAllergenicService } from './is-allergenic.service';

describe('IsAllergenicService', () => {
  let service: IsAllergenicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IsAllergenicService],
    }).compile();

    service = module.get<IsAllergenicService>(IsAllergenicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
