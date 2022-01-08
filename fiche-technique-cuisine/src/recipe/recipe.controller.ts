import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto) {
    console.log("Create recipe in progress ...");
    console.log("Recipe Controller : ", createRecipeDto);
    console.log("------------");
    return this.recipeService.create(createRecipeDto);
  }

  @Get()
  findAll() {
    return this.recipeService.findAll();
  }

  @Get('/cost/:id')
  getCostForRecipeById(@Param('id') id: string) {
    return this.recipeService.getCostForRecipeById(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipeService.findOne(+id);
  }

  @Get("/withoutdenree/:id")
  finOneWithOutDenree(@Param('id') id: string) {
    return this.recipeService.finOneWithOutDenree(+id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipeService.update(+id, updateRecipeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipeService.remove(+id);
  }
}
