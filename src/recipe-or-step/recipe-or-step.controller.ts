import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecipeOrStepService } from './recipe-or-step.service';
import { CreateRecipeOrStepDto } from './dto/create-recipe-or-step.dto';
import { UpdateRecipeOrStepDto } from './dto/update-recipe-or-step.dto';

@Controller('recipe-or-step')
export class RecipeOrStepController {
  constructor(private readonly recipeOrStepService: RecipeOrStepService) {}

  @Post()
  create(@Body() createRecipeOrStepDto: CreateRecipeOrStepDto) {
    return this.recipeOrStepService.create(createRecipeOrStepDto);
  }

  @Get()
  findAll() {
    return this.recipeOrStepService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipeOrStepService.findOne(+id);
  }



  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipeOrStepDto: UpdateRecipeOrStepDto) {
    return this.recipeOrStepService.update(+id, updateRecipeOrStepDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipeOrStepService.remove(+id);
  }
}
