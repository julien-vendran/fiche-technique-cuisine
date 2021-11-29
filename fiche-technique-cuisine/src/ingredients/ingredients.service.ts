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
    // console.log("Received DTO : " + req.body);
    return this.ingredientRepo.insert(this.ingredientRepo.create(createIngredientDto));
  }

  findAll(): Promise<Ingredient[]> {
    console.log("Returning all Ingredients");
    return this.ingredientRepo.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} ingredient`;
  }

  update(id: number, updateIngredientDto: UpdateIngredientDto) {
    return `This action updates a #${id} ingredient`;
  }

  remove(id: number) {
    return `This action removes a #${id} ingredient`;
  }
}
