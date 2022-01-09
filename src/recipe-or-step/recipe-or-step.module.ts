import { Module } from '@nestjs/common';
import { RecipeOrStepService } from './recipe-or-step.service';
import { RecipeOrStepController } from './recipe-or-step.controller';

@Module({
  controllers: [RecipeOrStepController],
  providers: [RecipeOrStepService]
})
export class RecipeOrStepModule {}
