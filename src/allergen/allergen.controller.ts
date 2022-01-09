import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AllergenService } from './allergen.service';
import { CreateAllergenDto } from './dto/create-allergen.dto';
import { UpdateAllergenDto } from './dto/update-allergen.dto';

@Controller('allergen')
export class AllergenController {
  constructor(private readonly allergenService: AllergenService) {}

  @Post()
   async create(@Body() createAllergenDto: CreateAllergenDto) {
    console.log("Create allergen in progress ...");
    return this.allergenService.create(createAllergenDto);
  }

  @Get()
  findAll() {
    return this.allergenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.allergenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAllergenDto: UpdateAllergenDto) {
    return this.allergenService.update(+id, updateAllergenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.allergenService.remove(+id);
  }
}
