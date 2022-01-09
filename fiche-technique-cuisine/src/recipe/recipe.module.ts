import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { TypeOrmModule } from "@nestjs/typeorm";

import { Recipe } from "./entities/recipe.entity";
import { StepModule } from 'src/step/step.module';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe]), StepModule],
  controllers: [RecipeController],
  providers: [RecipeService]
})
export class RecipeModule { }
