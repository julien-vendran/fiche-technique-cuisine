import { Module } from '@nestjs/common';
import { DenreeService } from './denree.service';
import { DenreeController } from './denree.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Denree} from "./entities/denree.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Denree])],
  controllers: [DenreeController],
  providers: [DenreeService]
})
export class DenreeModule {}
