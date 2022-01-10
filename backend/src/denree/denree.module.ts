import { Module } from '@nestjs/common';
import { DenreeService } from './denree.service';
import { DenreeController } from './denree.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Denree } from "./entities/denree.entity";
import { IngredientsModule } from 'src/ingredients/ingredients.module';

@Module({
  imports: [TypeOrmModule.forFeature([Denree]), IngredientsModule],
  controllers: [DenreeController],
  providers: [DenreeService],
  exports: [DenreeService]
})
export class DenreeModule { }