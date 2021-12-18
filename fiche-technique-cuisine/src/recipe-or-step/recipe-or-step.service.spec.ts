import { Test, TestingModule } from '@nestjs/testing';
import { RecipeOrStepService } from './recipe-or-step.service';

describe('RecipeOrStepService', () => {
  let service: RecipeOrStepService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecipeOrStepService],
    }).compile();

    service = module.get<RecipeOrStepService>(RecipeOrStepService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
