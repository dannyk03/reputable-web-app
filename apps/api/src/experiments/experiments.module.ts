import { Module } from '@nestjs/common';
import { ExperimentsService } from './experiments.service';
import { ExperimentsResolver } from './experiments.resolver';

@Module({
  providers: [ExperimentsResolver, ExperimentsService]
})
export class ExperimentsModule {}
