import { PartialType } from '@nestjs/mapped-types';
import { CreateDenreeDto } from './create-denree.dto';

export class UpdateDenreeDto extends PartialType(CreateDenreeDto) {}
