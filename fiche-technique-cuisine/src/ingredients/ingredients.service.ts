import { Injectable } from '@nestjs/common';

//TypeOrm 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//DTO 
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

//Ingredient
import { Ingredient } from './entities/ingredient.entity';

@Injectable()
export class IngredientsService {

  constructor (
    @InjectRepository(Ingredient)
    private ingredientRepo: Repository<Ingredient>
  ) {}

  /** Insert an ingedient to the database
   * @param createIngredientDto
      name: String;
      unit: String; 
      availableQuantity: number; 
      unitPrice: number; 
      isAllergenic: boolean; 
   */
  create(createIngredientDto: CreateIngredientDto) {
    return this.ingredientRepo.save(this.ingredientRepo.create(createIngredientDto));
  }

  findAll(): Promise<Ingredient[]> {
    return this.ingredientRepo.find({ relations: ["associatedAllergen"] });
  }

  findOne(id: number) {
    return this.ingredientRepo.findOne(id, { relations: ["associatedAllergen"] });
  }

  update(id: number, updateIngredientDto: UpdateIngredientDto) {
    return this.ingredientRepo.update(id, updateIngredientDto);
  }

  remove(id: number) {
    return `Supression de la données #${id}`;
  }
}
