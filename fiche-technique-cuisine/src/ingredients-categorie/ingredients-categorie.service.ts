import { Injectable } from '@nestjs/common';
import { CreateIngredientsCategorieDto } from './dto/create-ingredients-categorie.dto';
import { UpdateIngredientsCategorieDto } from './dto/update-ingredients-categorie.dto';

@Injectable()
export class IngredientsCategorieService {
  create(createIngredientsCategorieDto: CreateIngredientsCategorieDto) {
    return 'This action adds a new ingredientsCategorie';
  }

  findAll() {
    return `This action returns all ingredientsCategorie`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ingredientsCategorie`;
  }

  update(id: number, updateIngredientsCategorieDto: UpdateIngredientsCategorieDto) {
    return `This action updates a #${id} ingredientsCategorie`;
  }

  remove(id: number) {
    return `This action removes a #${id} ingredientsCategorie`;
  }
}
