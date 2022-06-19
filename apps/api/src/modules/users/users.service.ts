import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  Scope,
} from '@nestjs/common';
import * as DataLoader from 'dataloader';
import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import { plainToClass } from 'class-transformer';
import { CommunitiesService } from '../communities/communities.service';
import { User } from './entities/user.entity';
import { mapFromArray } from 'src/common/helpers';
import { Cron } from '@nestjs/schedule';
import * as fs from 'fs';
import * as moment from 'moment';
import { CommentsService } from '../comments/comments.service';

const getAuth0ManagementAccessToken = () => {
  const options: AxiosRequestConfig = {
    method: 'POST',
    url: `${process.env.AUTH0_ISSUER_URL}oauth/token`,
    headers: { 'content-type': 'application/json' },
    data: {
      grant_type: 'client_credentials',
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: `${process.env.AUTH0_ISSUER_URL}api/v2/`,
    },
  };

  return axios
    .request(options)
    .then(function (response) {
      return response.data.access_token;
    })
    .catch(function (error) {
      console.error(error.response.data);
      return [];
    });
};

// TODO: Auth0 can be created as an independent module so that we can use it in scripts etc easily.

@Injectable()
export class UsersService {
  private client: AxiosInstance;
  public loaderForExperiments = new DataLoader<string, User>(async (emails) => {
    const users = await this.findAll();
    const usersMap = mapFromArray<User>(users, (u) => u.email);
    return emails.map((email) => usersMap.get(email) as User);
  });
  constructor(
    private readonly communitiesService: CommunitiesService,
    @Inject(forwardRef(() => CommentsService))
    private commentsService: CommentsService,
  ) {
    this.client = axios.create({
      baseURL: `${process.env.AUTH0_ISSUER_URL}api/v2`,
      timeout: 5000,
      headers: {
        'content-type': 'application/json',
      },
    });
    this.refreshToken();
  }

  @Cron('* 15 * * * *')
  async refreshToken() {
    try {
      const persistedToken = (
        await fs.promises.readFile('./auth0Token.txt')
      ).toString();
      const lastTokenDate = persistedToken.split(' ')[1];
      const duration = moment(Date.now()).diff(
        moment(new Date(parseInt(lastTokenDate))),
        'h',
      );
      if (duration < 22) {
        this.client.defaults.headers['Authorization'] = `Bearer ${
          persistedToken.split(' ')[0]
        }`;
        return;
      }
    } catch (err) {
      console.log('Couldnt find accessToken, creating one..');
    }
    return getAuth0ManagementAccessToken().then((token) => {
      this.client.defaults.headers['Authorization'] = `Bearer ${token}`;
      fs.writeFile(
        './auth0Token.txt',
        `${token} ${Date.now().toString()}`,
        (err) => {
          if (err) console.error(err);
        },
      );
    });
  }

  async findAll() {
    // Get all users paginated
    const promises = await Promise.all([
      this.client.get('/users?page=0&per_page=50'),
      this.client.get('/users?page=1&per_page=50'),
    ]);

    return promises.reduce((prev, curr) => {
      return prev.concat(curr.data);
    }, []) as unknown as User[];
  }

  async findById(id: string) {
    return this.client.get<User>(`/users/${id}`).then((r) => r.data);
  }

  async updateOne(id: string, userData: Partial<User>) {
    return this.client.patch<User>(`/users/${id}`, userData).then(() => {
      this.loaderForExperiments.clearAll();
    });
  }

  async findOne(email: string) {
    return this.client
      .get<User>('/users-by-email', {
        params: {
          email,
        },
      })
      .then((r) => {
        return plainToClass(User, r.data[0]);
      });
  }

  async tipUser(from: string, to: string, amount: number) {
    if (from === to) throw new BadRequestException('Can not tip yourself');
    return this.client.get<User>(`users/${from}`).then(async (response) => {
      if (response.data.user_metadata.tokens - amount < 0) {
        throw new BadRequestException(
          'Insufficient funds to perform transaction.',
        );
      }
      const toUser = await this.client
        .get<User>(`users/${to}`)
        .then((r) => r.data);

      const fromUser = response.data;
      // Normally this should be a transaction operation with rollbacks if any
      // operation fails in the process
      await this.client.patch<User>(`/users/${from}`, {
        user_metadata: {
          tokens: fromUser.user_metadata.tokens - amount,
        },
      });
      await this.client.patch<User>(`/users/${to}`, {
        user_metadata: {
          tokens: toUser.user_metadata.tokens + amount,
          tips: [
            ...(toUser.user_metadata.tips || []),
            { userId: from, amount },
          ],
        },
      });
      this.loaderForExperiments.clearAll();
      this.commentsService.loaderForExperiments.clearAll();
      return {
        message: 'Transaction successful!',
      };
    });
  }

  async joinCommunity(email: string, community: string) {
    return this.findOne(email).then((user) => {
      if (user.user_metadata.communities.includes(community))
        return new BadRequestException(
          'You are already a member of this community',
        );
      return Promise.all([
        this.client.patch<User>(`/users/${user.user_id}`, {
          user_metadata: {
            communities: [...user.user_metadata.communities, community],
          },
        }),
        this.communitiesService.incrementMemberCount(community),
      ]).then((response) => {
        this.loaderForExperiments.clear(email);
        return {
          message: 'Joined community!',
        };
      });
    });
  }
}
