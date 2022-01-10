import { PartialType } from '@nestjs/mapped-types';
import { CreateIngredientsCategorieDto } from './create-ingredients-categorie.dto';

export class UpdateIngredientsCategorieDto extends PartialType(CreateIngredientsCategorieDto) {}
