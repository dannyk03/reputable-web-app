import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { MessageResponse } from 'src/common/entities/response';
import { CurrentUser } from 'src/decorators';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
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
}
