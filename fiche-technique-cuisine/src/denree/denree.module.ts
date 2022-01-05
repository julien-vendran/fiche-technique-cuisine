import { Module } from '@nestjs/common';
import { DenreeService } from './denree.service';
import { DenreeController } from './denree.controller';

@Module({
  controllers: [DenreeController],
  providers: [DenreeService]
})
export class DenreeModule {}
