import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import { plainToClass } from 'class-transformer';
import { User } from './entities/user.entity';

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

@Injectable()
export class UsersService {
  private client: AxiosInstance;
  constructor() {
    this.client = axios.create({
      baseURL: `${process.env.AUTH0_ISSUER_URL}api/v2`,
      timeout: 5000,
      headers: {
        'content-type': 'application/json',
      },
    });
    this.refreshToken();
  }

  async refreshToken() {
    return getAuth0ManagementAccessToken().then(
      (token) =>
        (this.client.defaults.headers['Authorization'] = `Bearer ${token}`),
    );
  }

  async findAll() {
    return this.client.get<User[]>('/users').then(function (response) {
      return response.data.map((user) => plainToClass(User, user));
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
}
