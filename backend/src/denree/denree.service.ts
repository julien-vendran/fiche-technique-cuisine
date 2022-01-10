import { Injectable } from '@nestjs/common';

import { InjectRepository } from "@nestjs/typeorm";
import { IngredientsService } from 'src/ingredients/ingredients.service';
import { Repository } from "typeorm";

import { CreateDenreeDto } from './dto/create-denree.dto';
import { UpdateDenreeDto } from './dto/update-denree.dto';

import { Denree } from "./entities/denree.entity";

@Injectable()
export class DenreeService {

  constructor(
    @InjectRepository(Denree)
    private denreeRepo: Repository<Denree>,
    private ingredientService: IngredientsService
  ) { }

  create(createDenreeDto: CreateDenreeDto) {
    console.log("Création denrée dans bd"); 
    return this.denreeRepo.save(this.denreeRepo.create(createDenreeDto));
  }

  findAll(): Promise<Denree[]> {
    return this.denreeRepo.find({ relations: ["ingredient"] })
  }

  findOne(id: number) {
    return this.denreeRepo.findOne(id, { relations: ["ingredient"] })
  }

  update(id: number, updateDenreeDto: UpdateDenreeDto) {
    return this.denreeRepo.save(updateDenreeDto);
  }

  remove(id: number) {
    return this.denreeRepo.delete(id);
  }

  async consumeDenree(idDenree: number) {
    const d: Denree = await this.findOne(idDenree);
    console.log("Denrée reçue : ", d);
    this.ingredientService.consumeIngredient(d.ingredient.id, d.quantity);
  }
}
