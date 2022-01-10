import { Injectable } from '@nestjs/common';
import { CreateRecipeOrStepDto } from './dto/create-recipe-or-step.dto';
import { UpdateRecipeOrStepDto } from './dto/update-recipe-or-step.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Recipe} from "../recipe/entities/recipe.entity";
import {Repository} from "typeorm";
import {RecipeOrStep} from "./entities/recipe-or-step.entity";

@Injectable()
export class RecipeOrStepService {


  constructor(
      @InjectRepository(RecipeOrStep)
      private readonly recipeRepo: Repository<RecipeOrStep>)
  {}


      create(createRecipeOrStepDto: CreateRecipeOrStepDto) {
    return 'This action adds a new recipeOrStep';
  }

  findAll() {
    return this.recipeRepo.find({ relations: ["parents", "listOfSteps"] });
  }

  findOne(id: number) {
    return `This action returns a #${id} recipeOrStep`;
  }

  update(id: number, updateRecipeOrStepDto: UpdateRecipeOrStepDto) {
    return `This action updates a #${id} recipeOrStep`;
  }

  remove(id: number) {
    return this.recipeRepo.delete(id);
  }
}
