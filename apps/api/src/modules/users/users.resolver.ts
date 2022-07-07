import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Int,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { MessageResponse } from 'src/common/entities/response';
import { CurrentUser, Public } from 'src/decorators';
import { ExperimentsService } from '../experiments/experiments.service';

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
  tipUser(
    @CurrentUser() user: User,
    @Args('userId') to: string,
    @Args('tip', { type: () => Int }) amount: number,
  ) {
    return this.usersService.tipUser(user.user_id, to, amount);
  }

  @Mutation(() => MessageResponse)
  joinCommunity(
    @CurrentUser() user: User,
    @Args('community') community: string,
  ) {
    return this.usersService.joinCommunity(user.email, community);
  }

  @Mutation(() => MessageResponse)
  updateAddres(@CurrentUser() user: User, @Args('address') address: string) {
    return this.usersService.updateAddress(user.email, address);
  }

  @ResolveField('experiments_count', (returns) => Int)
  async getExperiments(@Parent() user: User) {
    const usersLoader = this.experimentsService.loaderForUsers;
    const experiments = await usersLoader.load(user.email);
    return experiments?.length ?? 0;
  }
}
