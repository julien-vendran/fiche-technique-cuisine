import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IngredientsCategorieService } from './ingredients-categorie.service';
import { CreateIngredientsCategorieDto } from './dto/create-ingredients-categorie.dto';
import { UpdateIngredientsCategorieDto } from './dto/update-ingredients-categorie.dto';

@Controller('ingredients-categorie')
export class IngredientsCategorieController {
  constructor(private readonly ingredientsCategorieService: IngredientsCategorieService) {}

  @Post()
  create(@Body() createIngredientsCategorieDto: CreateIngredientsCategorieDto) {
    return this.ingredientsCategorieService.create(createIngredientsCategorieDto);
  }

  @Get()
  findAll() {
    return this.ingredientsCategorieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ingredientsCategorieService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIngredientsCategorieDto: UpdateIngredientsCategorieDto) {
    return this.ingredientsCategorieService.update(+id, updateIngredientsCategorieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ingredientsCategorieService.remove(+id);
  }
}
