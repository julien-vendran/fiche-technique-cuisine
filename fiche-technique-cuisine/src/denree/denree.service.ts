import { Injectable } from '@nestjs/common';

import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

import { CreateDenreeDto } from './dto/create-denree.dto';
import { UpdateDenreeDto } from './dto/update-denree.dto';

import {Denree} from "./entities/denree.entity";

@Injectable()
export class DenreeService {

  constructor(
  @InjectRepository(Denree)
  private denreeRepo: Repository<Denree>
  ){}

  create(createDenreeDto: CreateDenreeDto) {
    return this.denreeRepo.save(this.denreeRepo.create(createDenreeDto));
  }

  findAll() : Promise<Denree[]> {
    return this.denreeRepo.find({relations:["ingredient"]})
  }

  findOne(id: number) {
    return this.denreeRepo.findOne(id,{relations:["ingredient"]})
  }

  update(id: number, updateDenreeDto: UpdateDenreeDto) {
    return this.denreeRepo.save(updateDenreeDto);
  }

  remove(id: number) {
    return this.denreeRepo.delete(id);
  }
}
