import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { MessageResponse } from 'src/common/entities/response';
import { CurrentUser, Public } from 'src/decorators';
import { Comment } from '../comments/entities/comment.entity';
import { ExperimentsService } from '../experiments/experiments.service';
import { Experiment } from '../experiments/entities/experiment.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly experimentsService: ExperimentsService,
  ) {}

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Public()
  @Query(() => User, { name: 'userByEmail' })
  findById(@Args('email') email: string) {
    return this.usersService.findOne(email);
  }

  @Query(() => User, { name: 'me' })
  me(@CurrentUser() user: User) {
    return user;
  }

  @Mutation(() => MessageResponse)
  makeTransaction(
    @Args('from') from: string,
    @Args('to') to: string,
    @Args('amount') amount: number,
  ) {
    return this.usersService.makeTransaction(from, to, amount);
  }

  @Mutation(() => MessageResponse)
  joinCommunity(
    @CurrentUser() user: User,
    @Args('community') community: string,
  ) {
    return this.usersService.joinCommunity(user.email, community);
  }

  @ResolveField('experiments', (returns) => [Experiment])
  async getExperiments(@Parent() user: User) {
    const usersLoader = this.experimentsService.loaderForUsers;
    return usersLoader.load(user.email);
  }
}
