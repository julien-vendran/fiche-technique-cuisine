import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IsAllergenicService } from './is-allergenic.service';
import { CreateIsAllergenicDto } from './dto/create-is-allergenic.dto';
import { UpdateIsAllergenicDto } from './dto/update-is-allergenic.dto';

@Controller('is-allergenic')
export class IsAllergenicController {
  constructor(private readonly isAllergenicService: IsAllergenicService) {}

  @Post()
  create(@Body() createIsAllergenicDto: CreateIsAllergenicDto) {
    return this.isAllergenicService.create(createIsAllergenicDto);
  }

  @Get()
  findAll() {
    return this.isAllergenicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.isAllergenicService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIsAllergenicDto: UpdateIsAllergenicDto) {
    return this.isAllergenicService.update(+id, updateIsAllergenicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.isAllergenicService.remove(+id);
  }
}
