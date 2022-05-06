import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Community, CommunityDocument } from './entities/community.entity';
import { Model } from 'mongoose';
import * as DataLoader from 'dataloader';
import { mapFromArray } from '../../common/helpers';

@Injectable()
export class CommunitiesService {
  constructor(
    @InjectModel(Community.name)
    private communitiesModel: Model<CommunityDocument>,
  ) {}

  findAll() {
    return this.communitiesModel.find({}).orFail().exec();
  }

  findOne(slug: string) {
    return this.communitiesModel.findOne({ slug }).orFail().exec();
  }

  incrementMemberCount(slug: string) {
    return this.communitiesModel.updateOne(
      { slug },
      { $inc: { memberCount: 1 } },
    );
  }

  getLoaderForExperiments() {
    return new DataLoader<string, Community>(async (slugs) => {
      const communities = await Promise.all(
        slugs.map((slug) => this.findOne(slug)),
      );
      const communitiesMap = mapFromArray<Community>(
        communities,
        (c) => c.slug,
      );
      return slugs.map((slug) => communitiesMap.get(slug) as Community);
    });
  }
}
