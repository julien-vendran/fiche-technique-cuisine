import { Test, TestingModule } from '@nestjs/testing';
import { IngredientsCategorieController } from './ingredients-categorie.controller';
import { IngredientsCategorieService } from './ingredients-categorie.service';

describe('IngredientsCategorieController', () => {
  let controller: IngredientsCategorieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IngredientsCategorieController],
      providers: [IngredientsCategorieService],
    }).compile();

    controller = module.get<IngredientsCategorieController>(IngredientsCategorieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
