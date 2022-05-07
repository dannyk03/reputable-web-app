import { forwardRef, Module } from '@nestjs/common';
import { ExperimentsService } from './experiments.service';
import { ExperimentsResolver } from './experiments.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Experiment, ExperimentSchema } from './entities/experiment.entity';
import { CommentsModule } from '../comments/comments.module';
import { UsersModule } from '../users/users.module';
import { CommunitiesModule } from '../communities/communities.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Experiment.name,
        schema: ExperimentSchema,
      },
    ]),
    CommentsModule,
    forwardRef(() => UsersModule),
    CommunitiesModule,
  ],
  providers: [ExperimentsResolver, ExperimentsService],
  exports: [ExperimentsService],
})
export class ExperimentsModule {}
