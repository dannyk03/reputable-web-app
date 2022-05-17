import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { CommunitiesModule } from '../communities/communities.module';
import { ExperimentsModule } from '../experiments/experiments.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CommentsModule } from '../comments/comments.module';

@Module({
  imports: [
    CommunitiesModule,
    forwardRef(() => ExperimentsModule),
    ScheduleModule.forRoot(),
    forwardRef(() => CommentsModule),
  ],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
