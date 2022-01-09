import { Test, TestingModule } from '@nestjs/testing';
import { RecipeOrStepController } from './recipe-or-step.controller';
import { RecipeOrStepService } from './recipe-or-step.service';

describe('RecipeOrStepController', () => {
  let controller: RecipeOrStepController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipeOrStepController],
      providers: [RecipeOrStepService],
    }).compile();

    controller = module.get<RecipeOrStepController>(RecipeOrStepController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
