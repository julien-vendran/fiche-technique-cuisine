import { Module } from '@nestjs/common';
import { AllergenService } from './allergen.service';
import { AllergenController } from './allergen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Allergen } from './entities/allergen.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Allergen])],
  controllers: [AllergenController],
  providers: [AllergenService]
})
export class AllergenModule { }
