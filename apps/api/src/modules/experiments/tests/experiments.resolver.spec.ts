import { Test, TestingModule } from '@nestjs/testing';
import { ExperimentsResolver } from '../experiments.resolver';
import { ExperimentsService } from '../experiments.service';

describe('ExperimentsResolver', () => {
  let resolver: ExperimentsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExperimentsResolver, ExperimentsService],
    }).compile();

    resolver = module.get<ExperimentsResolver>(ExperimentsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
