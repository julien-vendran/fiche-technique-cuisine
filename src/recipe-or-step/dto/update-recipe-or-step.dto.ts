import { PartialType } from '@nestjs/mapped-types';
import { CreateRecipeOrStepDto } from './create-recipe-or-step.dto';

export class UpdateRecipeOrStepDto extends PartialType(CreateRecipeOrStepDto) {}
