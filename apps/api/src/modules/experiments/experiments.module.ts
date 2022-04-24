import { Module } from '@nestjs/common';
import { ExperimentsService } from './experiments.service';
import { ExperimentsResolver } from './experiments.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Experiment, ExperimentSchema } from './entities/experiment.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Experiment.name,
        schema: ExperimentSchema,
      },
    ]),
  ],
  providers: [ExperimentsResolver, ExperimentsService],
})
export class ExperimentsModule {}
