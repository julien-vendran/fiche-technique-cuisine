import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import {TypeOrmModule} from "@nestjs/typeorm";

import {RecipeOrStep} from "../recipe-or-step/entities/recipe-or-step.entity";
import {Recipe} from "./entities/recipe.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Recipe])],
  controllers: [RecipeController],
  providers: [RecipeService]
})
export class RecipeModule {}
