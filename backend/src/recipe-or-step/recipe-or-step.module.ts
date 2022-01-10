import { Module } from '@nestjs/common';
import { RecipeOrStepService } from './recipe-or-step.service';
import { RecipeOrStepController } from './recipe-or-step.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { RecipeOrStep } from "./entities/recipe-or-step.entity";

@Module({
  imports: [TypeOrmModule.forFeature([RecipeOrStep])],
  controllers: [RecipeOrStepController],
  providers: [RecipeOrStepService]
})
export class RecipeOrStepModule { }
