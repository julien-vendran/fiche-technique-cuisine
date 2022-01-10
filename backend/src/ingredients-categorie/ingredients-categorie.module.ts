import { Module } from '@nestjs/common';
import { IngredientsCategorieService } from './ingredients-categorie.service';
import { IngredientsCategorieController } from './ingredients-categorie.controller';

@Module({
  controllers: [IngredientsCategorieController],
  providers: [IngredientsCategorieService]
})
export class IngredientsCategorieModule { }
