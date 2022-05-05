import { Injectable } from '@nestjs/common';
import { CreateCommunityInput } from './dto/create-community.input';
import { communities } from '../../common/data';
import { InjectModel } from '@nestjs/mongoose';
import { Community, CommunityDocument } from './entities/community.entity';
import { Model } from 'mongoose';

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
}
