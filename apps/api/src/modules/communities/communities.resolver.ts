import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommunitiesService } from './communities.service';
import { Community } from './entities/community.entity';

@Resolver(() => Community)
export class CommunitiesResolver {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @Query(() => [Community], { name: 'communities' })
  findAll() {
    return this.communitiesService.findAll();
  }

  @Query(() => Community, { name: 'community' })
  findOne(@Args('slug') slug: string) {
    return this.communitiesService.findOne(slug);
  }
}
