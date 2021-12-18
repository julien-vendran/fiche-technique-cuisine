import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Recipe} from "./entities/recipe.entity";
import {Repository} from "typeorm";


@Injectable()
export class RecipeService {

  constructor(
      @InjectRepository(Recipe)
      private recipeRepo:Repository<Recipe>
  ){}

  create(createRecipeDto: CreateRecipeDto) {
    return this.recipeRepo.save(this.recipeRepo.create(createRecipeDto));
  }

  findAll(): Promise<Recipe[]> {
    return this.recipeRepo.find(/*{ relations: ["associatedAllergen"] }*/);
  }

  findOne(id: number) {
    return this.recipeRepo.findOne(id/*, { relations: ["associatedAllergen"] }*/);
  }

  update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return this.recipeRepo.update(id, updateRecipeDto);
  }

  remove(id: number) {
    //return `Supression de la données #${id}`;
    return this.recipeRepo.delete(id);
  }
}
