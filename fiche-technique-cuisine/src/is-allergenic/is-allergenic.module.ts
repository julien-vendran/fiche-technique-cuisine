import { Module } from '@nestjs/common';
import { IsAllergenicService } from './is-allergenic.service';
import { IsAllergenicController } from './is-allergenic.controller';

@Module({
  controllers: [IsAllergenicController],
  providers: [IsAllergenicService]
})
export class IsAllergenicModule {}
