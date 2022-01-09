import { Injectable } from '@nestjs/common';
import { CreateStepDto } from './dto/create-step.dto';
import { UpdateStepDto } from './dto/update-step.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Step } from "./entities/step.entity";
import { DenreeService } from 'src/denree/denree.service';

@Injectable()
export class StepService {

  constructor(
    @InjectRepository(Step)
    private readonly stepRepo: Repository<Step>,
    private readonly denreeService: DenreeService
  ) { }

  create(createStepDto: CreateStepDto) {
    console.log("On crée une étape (LES DENREES SIVOUPLé)", createStepDto);
    return this.stepRepo.save(this.stepRepo.create(createStepDto));
  }

  findAll(): Promise<Step[]> {
    return this.stepRepo.find({ relations: ["denreeUsed"] });
  }

  findOne(id: number) {
    return this.stepRepo.findOne(id, { relations: ["denreeUsed"] });
  }

  update(id: number, updateStepDto: UpdateStepDto) {
    return this.stepRepo.update(id, updateStepDto);
  }

  remove(id: number) {
    //return `Supression de la données #${id}`;
    return this.stepRepo.delete(id);
  }

  async consumeStep(id: number) {
    const step: Step = await this.findOne(id);
    step.denreeUsed.map(
      data => this.denreeService.consumeDenree(data.id)
    );
  }
}
