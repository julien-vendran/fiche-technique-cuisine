import { PartialType } from '@nestjs/mapped-types';
import { CreateIsAllergenicDto } from './create-is-allergenic.dto';

export class UpdateIsAllergenicDto extends PartialType(CreateIsAllergenicDto) {}
