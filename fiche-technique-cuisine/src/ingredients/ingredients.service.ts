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
    console.log("Modification de l'ingrédient " + id + " : " , updateIngredientDto);
    //return this.ingredientRepo.update(id, updateIngredientDto);
    return this.ingredientRepo.save(updateIngredientDto);
  }

  remove(id: number) {
    //return `Supression de la données #${id}`;
    return this.ingredientRepo.delete(id); 
  }
}
