import { Module } from '@nestjs/common';
import { ExperimentsService } from './experiments.service';
import { ExperimentsResolver } from './experiments.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Experiment, ExperimentSchema } from './entities/experiment.entity';
import { CommentsModule } from '../comments/comments.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Experiment.name,
        schema: ExperimentSchema,
      },
    ]),
    CommentsModule,
  ],
  providers: [ExperimentsResolver, ExperimentsService],
})
export class ExperimentsModule {}