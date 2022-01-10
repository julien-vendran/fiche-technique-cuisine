import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DenreeService } from './denree.service';
import { CreateDenreeDto } from './dto/create-denree.dto';
import { UpdateDenreeDto } from './dto/update-denree.dto';

@Controller('denree')
export class DenreeController {
  constructor(private readonly denreeService: DenreeService) { }

  @Post()
  create(@Body() createDenreeDto: CreateDenreeDto) {
    console.log("Create denree in progress ....");
    return this.denreeService.create(createDenreeDto);
  }

  @Get()
  findAll() {
    return this.denreeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.denreeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDenreeDto: UpdateDenreeDto) {
    return this.denreeService.update(+id, updateDenreeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.denreeService.remove(+id);
  }
}
