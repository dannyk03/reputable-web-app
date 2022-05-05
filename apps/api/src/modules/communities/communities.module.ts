import { Module } from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { CommunitiesResolver } from './communities.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Community, CommunitySchema } from './entities/community.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Community.name,
        schema: CommunitySchema,
      },
    ]),
  ],
  providers: [CommunitiesResolver, CommunitiesService],
  exports: [CommunitiesService],
})
export class CommunitiesModule {}
