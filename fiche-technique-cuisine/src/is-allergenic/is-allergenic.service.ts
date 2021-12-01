import { Injectable } from '@nestjs/common';
import { CreateIsAllergenicDto } from './dto/create-is-allergenic.dto';
import { UpdateIsAllergenicDto } from './dto/update-is-allergenic.dto';

@Injectable()
export class IsAllergenicService {
  create(createIsAllergenicDto: CreateIsAllergenicDto) {
    return 'This action adds a new isAllergenic';
  }

  findAll() {
    return `This action returns all isAllergenic`;
  }

  findOne(id: number) {
    return `This action returns a #${id} isAllergenic`;
  }

  update(id: number, updateIsAllergenicDto: UpdateIsAllergenicDto) {
    return `This action updates a #${id} isAllergenic`;
  }

  remove(id: number) {
    return `This action removes a #${id} isAllergenic`;
  }
}
