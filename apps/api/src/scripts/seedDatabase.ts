import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });
import { faker } from '@faker-js/faker';
import axios, { AxiosRequestConfig } from 'axios';
import {
  Experiment,
  ExperimentResultMarker,
  ExperimentStatus,
  ResultHistory,
} from '../experiments/entities/experiment.entity';

export const communities = [
  'Sleep',
  'Longevity',
  'Anxiety',
  'Weight Loss',
  'Meditation',
  'Anxiety',
  'Chronic Pain',
  'Cardiovascular',
  'Blood Sugar',
];

export const experimentResultMarkers: ExperimentResultMarker[] = [
  {
    name: 'Resting Heart Rate',
    unit: 'bpm',
    slug: 'resting-heart-rate',
    more_is_better: false,
  },
  {
    name: 'Deep Sleep',
    unit: 'minutes',
    slug: 'deep-sleep',
    more_is_better: true,
  },
  {
    name: 'HRV',
    unit: 'milliseconds',
    slug: 'hrv',
    more_is_better: true,
  },
];

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

const getUsers = () => {
  const options: AxiosRequestConfig = {
    method: 'GET',
    url: `${process.env.AUTH0_ISSUER_URL}api/v2/users`,
    params: { search_engine: 'v3' },
  };

  return axios
    .request<any[]>(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
      return [];
    });
};

const generateResultHistory = (startDate: Date, endDate: Date) => {
  return {
    date: faker.date.between(startDate, endDate),
    markerValue: faker.datatype.number({ min: 50, max: 200 }),
    imageLink: faker.image.imageUrl(),
  };
};

export const generateExperimentResultHistory = (
  length: number,
  startDate: Date,
  endDate: Date,
): ResultHistory[] => {
  return [...new Array(length)].map(() =>
    generateResultHistory(startDate, endDate),
  ) as ResultHistory[];
};

function getRandomSubarray(arr: any[], size: number) {
  // eslint-disable-next-line prefer-const
  let shuffled = arr.slice(0),
    i = arr.length,
    temp,
    index;
  while (i--) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(0, size);
}

async function main() {
  const client = new MongoClient(process.env.DB_URL);
  await client.connect();
  const db = client.db();
  console.log('Connected to database');
  console.log('Starting experiment seeding');
  const accessToken = await getAuth0ManagementAccessToken();
  console.log('Retrieved access token for auth0');
  axios.defaults.headers['Authorization'] = `Bearer  ${accessToken}`;
  console.log('Retrieving possible users we can sample from');
  const users = await getUsers();
  console.log('Retrieved', users.length, 'users');
  const experiments = await Promise.all(
    [...new Array(400)].map(() => generateExperiment(users)),
  );
  console.log(experiments);
  await db.collection('experiments').insertMany(experiments);
}

export const generateExperiment = async (users) => {
  const startDate = faker.date.recent(30);
  const endDate = faker.date.soon(30);

  const randomExperiment: Omit<Experiment, 'createdAt' | 'updatedAt' | '_id'> =
    {
      title: faker.lorem.sentence(6),
      status:
        Object.values(ExperimentStatus)[
          faker.datatype.number({
            min: 0,
            max: Object.values(ExperimentStatus).length - 1,
          })
        ],
      startDate,
      endDate,
      communities: getRandomSubarray(
        communities,
        faker.datatype.number({ min: 1, max: 3 }),
      ),
      description: faker.lorem.paragraphs(5, '<br/>'),
      createdBy:
        users[faker.datatype.number({ min: 0, max: users.length - 1 })].email,
      results: [
        {
          marker: experimentResultMarkers[0],
          history: generateExperimentResultHistory(10, startDate, endDate),
        },
        {
          marker: experimentResultMarkers[1],
          history: generateExperimentResultHistory(10, startDate, endDate),
        },
        {
          marker: experimentResultMarkers[2],
          history: generateExperimentResultHistory(10, startDate, endDate),
        },
      ],
    };
  return randomExperiment;
};

main();
