import { Injectable } from '@nestjs/common';
import { CreateDenreeDto } from './dto/create-denree.dto';
import { UpdateDenreeDto } from './dto/update-denree.dto';

@Injectable()
export class DenreeService {
  create(createDenreeDto: CreateDenreeDto) {
    return 'This action adds a new denree';
  }

  findAll() {
    return `This action returns all denree`;
  }

  findOne(id: number) {
    return `This action returns a #${id} denree`;
  }

  update(id: number, updateDenreeDto: UpdateDenreeDto) {
    return `This action updates a #${id} denree`;
  }

  remove(id: number) {
    return `This action removes a #${id} denree`;
  }
}
