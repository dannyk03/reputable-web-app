import { Author, IComment } from "./components/Comment";
import {
  ExperimentResultMarker,
  ExperimentStatus,
  IExperiment,
  IUser,
} from "./pages/_app";

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

export const authors: Author[] = [
  {
    firstName: "Tolga",
    lastName: "Oğuz",
  },
  {
    firstName: "John",
    lastName: "Doe",
  },
  {
    firstName: "Edanur",
    lastName: "Malkoç",
  },
];

export const comments: IComment[] = [
  {
    author: authors[0],
    upvotes: 230,
    downvotes: 21,
    updatedAt: new Date(),
    replies: [
      {
        author: authors[1],
        upvotes: 5432,
        downvotes: 999,
        updatedAt: new Date(),
        isReply: true,
      },
    ],
  },
  {
    author: authors[1],
    upvotes: 10394,
    downvotes: 1032,
    updatedAt: new Date(),
  },
  {
    author: authors[2],
    upvotes: 1232,
    downvotes: 102,
    updatedAt: new Date(),
  },
];

export const user: IUser = {
  firstName: "Tolga",
  email: "tolgaouzz@gmail.com",
  lastName: "Oğuz",
};

export const experimentResultMarkers: ExperimentResultMarker[] = [
  {
    name: "Resting Heart Rate",
    unit: "bpm",
  },
  {
    name: "Deep Sleep",
    unit: "minutes",
  },
  {
    name: "HRV",
    unit: "milliseconds",
  },
];

export const experiment: IExperiment = {
  title: "Meditate twice daily and measure deep sleep",
  status: ExperimentStatus.ACTIVE,
  createdBy: user,
  startDate: new Date(2022, 3, 1),
  endDate: new Date(2022, 3, 12),
  communities: [
    {
      name: "Sleep",
      icon: "/icons/Sleep.svg",
    },
  ],
  comments: comments,
  tags: ["Sleep", "Meditation", "Stress", "Core"],
  content: [
    {
      heading: "Hypothesis",
      body: "Reduced stress (noted by reduced resting heart rate and increased HRV), improved deep sleep and improved cognitive function.",
    },
    {
      heading: "Testing Method",
      body: "I will measure my resting heart rate, sleep (deep sleep, REM sleep and light sleep) with my Oura ring daily. My Oura ring will take note of the time of meditation and duration.",
    },
    {
      heading: "Variables",
      body: "Variables: I will try not starting anything new during this time. I already work out intermittently and will continue to do that and don’t follow any strict diet protocol.",
    },
    {
      heading: "Other outcomes",
      body: "I would love to measure cognitive functioning. Does anyone know any objective ways to measure this?",
    },
  ],
  results: [
    {
      marker: experimentResultMarkers[0],
      history: [
        {
          date: new Date(),
          value: 54,
        },
        {
          date: new Date(2022, 8, 7),
          value: 48,
        },
      ],
    },
    {
      marker: experimentResultMarkers[1],
      history: [
        {
          date: new Date(),
          value: 132,
        },
        {
          date: new Date(2022, 8, 7),
          value: 105,
        },
      ],
    },
    {
      marker: experimentResultMarkers[2],
      history: [
        {
          date: new Date(),
          value: 48,
        },
        {
          date: new Date(2022, 8, 7),
          value: 32,
        },
      ],
    },
  ],
};
