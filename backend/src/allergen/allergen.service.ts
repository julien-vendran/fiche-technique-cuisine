import { Injectable } from '@nestjs/common';
import { CreateAllergenDto } from './dto/create-allergen.dto';
import { UpdateAllergenDto } from './dto/update-allergen.dto';

//TypeOrm 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Allergen } from './entities/allergen.entity';

@Injectable()
export class AllergenService {

  constructor(
    @InjectRepository(Allergen)
    private allergenRepo: Repository<Allergen>
  ) { }

  create(createAllergenDto: CreateAllergenDto) {
    return this.allergenRepo.save(this.allergenRepo.create(createAllergenDto));
  }

  findAll() {
    return this.allergenRepo.find();
  }

  findOne(id: number) {
    return this.allergenRepo.findOne(id);
  }

  update(id: number, updateAllergenDto: UpdateAllergenDto) {
    return `This action updates a #${id} allergen`;
  }

  remove(id: number) {
    console.log(`This action removes a #${id} allergen`);
    return this.allergenRepo.delete(id);
  }
}
