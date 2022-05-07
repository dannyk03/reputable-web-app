import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { CommunitiesModule } from '../communities/communities.module';
import { ExperimentsModule } from '../experiments/experiments.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    CommunitiesModule,
    forwardRef(() => ExperimentsModule),
    ScheduleModule.forRoot(),
  ],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
