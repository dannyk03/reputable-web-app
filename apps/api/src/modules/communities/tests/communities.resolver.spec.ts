import { Test, TestingModule } from '@nestjs/testing';
import { CommunitiesResolver } from '../communities.resolver';
import { CommunitiesService } from '../communities.service';

describe('CommunitiesResolver', () => {
  let resolver: CommunitiesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunitiesResolver, CommunitiesService],
    }).compile();

    resolver = module.get<CommunitiesResolver>(CommunitiesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
