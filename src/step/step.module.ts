import { Module } from '@nestjs/common';
import { StepService } from './step.service';
import { StepController } from './step.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Step } from "./entities/step.entity";
import { DenreeModule } from 'src/denree/denree.module';

@Module({
  imports: [TypeOrmModule.forFeature([Step]), DenreeModule],
  controllers: [StepController],
  providers: [StepService],
  exports: [StepService]
})
export class StepModule { }
