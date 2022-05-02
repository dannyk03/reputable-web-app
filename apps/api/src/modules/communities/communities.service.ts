import { Injectable } from '@nestjs/common';
import { CreateCommunityInput } from './dto/create-community.input';
import { UpdateCommunityInput } from './dto/update-community.input';
import { communities } from '../../common/data';

@Injectable()
export class CommunitiesService {
  create(createCommunityInput: CreateCommunityInput) {
    return 'This action adds a new community';
  }

  findAll() {
    return communities;
  }

  findOne(slug: string) {
    return communities.filter((c) => c.slug === slug);
  }
}
