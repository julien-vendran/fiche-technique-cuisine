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

    console.log("Log : recipeDTO ",createRecipeDto);
    let temp = this.recipeRepo.create(createRecipeDto);
    console.log("temp", temp);
  //  temp.parents=null;
    return this.recipeRepo.manager.save(temp);
  }

  findAll(): Promise<Recipe[]> {
    return this.recipeRepo.find({ relations: ["parents", "listOfSteps"] });
  }

  findOne(id: number) {
    return this.recipeRepo.findOne(id, { relations: ["parents", "listOfSteps"] });
  }

  update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return this.recipeRepo.update(id, updateRecipeDto);
  }

  remove(id: number) {
    //return `Supression de la données #${id}`;
    return this.recipeRepo.delete(id);
  }
}
