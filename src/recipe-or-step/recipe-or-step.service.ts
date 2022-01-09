import { Injectable } from '@nestjs/common';
import { CreateRecipeOrStepDto } from './dto/create-recipe-or-step.dto';
import { UpdateRecipeOrStepDto } from './dto/update-recipe-or-step.dto';

@Injectable()
export class RecipeOrStepService {
  create(createRecipeOrStepDto: CreateRecipeOrStepDto) {
    return 'This action adds a new recipeOrStep';
  }

  findAll() {
    return `This action returns all recipeOrStep`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recipeOrStep`;
  }

  update(id: number, updateRecipeOrStepDto: UpdateRecipeOrStepDto) {
    return `This action updates a #${id} recipeOrStep`;
  }

  remove(id: number) {
    return `This action removes a #${id} recipeOrStep`;
  }
}
