import { Injectable } from '@nestjs/common';

//TypeOrm 
import { InjectRepository } from '@nestjs/typeorm';
import { DenreeService } from 'src/denree/denree.service';
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
    private ingredientRepo: Repository<Ingredient>, 
  ) {}
  
  create(createIngredientDto: CreateIngredientDto) {
    return this.ingredientRepo.save(this.ingredientRepo.create(createIngredientDto));
  }

  findAll(): Promise<Ingredient[]> {
    return this.ingredientRepo.find({ relations: ["associatedAllergen", "denreeUsed"] });
  }

  findOne(id: number) {
    return this.ingredientRepo.findOne(id, { relations: ["associatedAllergen"] });
  }

  async update(id: number, updateIngredientDto: UpdateIngredientDto) {
    console.log("Modification de l'ingrédient " + id + " : " , updateIngredientDto);
    const ingre: Ingredient = await this.findOne(id);
    updateIngredientDto.denreeUsed = ingre.denreeUsed
    updateIngredientDto.associatedAllergen = ingre.associatedAllergen; 
    this.ingredientRepo.save(updateIngredientDto);
  }

  remove(id: number) {
    //return `Supression de la données #${id}`;
    return this.ingredientRepo.delete(id); 
  }

  async consumeIngredient (id: number, qte: number) {
    const ingredient: Ingredient = await this.findOne(id); 
    console.log("Ingrédient à décrémenter : ", ingredient);
    ingredient.availableQuantity -= qte; 
    await this.ingredientRepo.save(ingredient); 
  }
}
