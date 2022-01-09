import { Test, TestingModule } from '@nestjs/testing';
import { IngredientsCategorieService } from './ingredients-categorie.service';

describe('IngredientsCategorieService', () => {
  let service: IngredientsCategorieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IngredientsCategorieService],
    }).compile();

    service = module.get<IngredientsCategorieService>(IngredientsCategorieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
