import { Module } from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { CommunitiesResolver } from './communities.resolver';

@Module({
  providers: [CommunitiesResolver, CommunitiesService]
})
export class CommunitiesModule {}
