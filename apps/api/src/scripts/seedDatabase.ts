import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });
import { faker } from '@faker-js/faker';
import axios, { AxiosRequestConfig } from 'axios';
import {
  Experiment,
  ExperimentDocument,
  ExperimentStatus,
  ResultHistory,
} from '../modules/experiments/entities/experiment.entity';
import {
  Comment,
  CommentDocument,
} from '../modules/comments/entities/comment.entity';
import { experimentResultMarkers } from '../common/data/markers';

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

const pickRandomFromArray = (arr: any[]) => {
  return arr[
    faker.datatype.number({
      min: 0,
      max: Math.max(arr.length - 1, 0),
    })
  ];
};

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
  console.log('Starting script...');
  const client = new MongoClient(process.env.DB_URL);
  await client.connect();
  const db = client.db();
  console.log('Connected to database');
  console.log('Dropping collections...');
  await db.dropCollection('experiments');
  await db.dropCollection('comments');
  console.log('Starting experiment seeding');
  const accessToken = await getAuth0ManagementAccessToken();
  console.log('Retrieved access token for auth0');
  axios.defaults.headers['Authorization'] = `Bearer  ${accessToken}`;
  console.log('Retrieving possible users we can sample from');
  const users = await getUsers();
  console.log(users);
  console.log('Retrieved', users.length, 'users');
  const newExperiments = await Promise.all(
    [...new Array(40)].map(() => generateExperiment(users)),
  );
  await db.collection('experiments').insertMany(newExperiments);
  console.log('Inserted documents to db');
  console.log(
    'Will insert comments... Retrieving sample experiments to attach comments',
  );
  const experiments = await db
    .collection('experiments')
    .find<ExperimentDocument>({})
    .toArray();
  console.log('Retrieved experiments, generating comments...');
  const newComments = await Promise.all(
    [...new Array(120)].map(() => generateComment(experiments, users)),
  );
  await db.collection('comments').insertMany(newComments);
  console.log('Will add some replies now');
  const comments = await db
    .collection('comments')
    .find<CommentDocument>({})
    .toArray();
  const replies = await Promise.all(
    [...new Array(240)].map(() =>
      generateComment(experiments, users, comments),
    ),
  );
  await db.collection('comments').insertMany(replies);
  console.log('Added replies!');
  console.log('Script is done. Exiting...');
  process.exit(1);
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

/**
 * Generates a random comment and relates them to random experiments and users.
 * @param experiments A list of available experiments that will be linked to generated comments
 * @param users A list of available users that will be linked to generated comments.
 */
export const generateComment = (
  experiments: ExperimentDocument[],
  users: Record<string, any>[],
  replyToComments: CommentDocument[] = [],
): Omit<Comment, 'createdAt' | '_id'> => {
  const randomReplyComment = pickRandomFromArray(replyToComments);
  const randomAuthor = pickRandomFromArray(users);
  const randomExperiment = pickRandomFromArray(experiments);
  return {
    text: faker.lorem.paragraph(3),
    author: randomAuthor.email,
    replyTo: replyToComments.length > 0 ? randomReplyComment._id : undefined,
    experiment:
      replyToComments.length === 0
        ? randomExperiment._id
        : randomReplyComment.experiment,
  };
};

main();
