import { Author, IComment } from "./components/Comment";
import {
  ExperimentResultMarker,
  ExperimentStatus,
  ICommunity,
  IExperiment,
  IUser,
  MarkerValueChangeType,
} from "./pages/_app";

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

export const communities: ICommunity[] = [
  {
    name: "Sleep",
    memberCount: 45321,
    icon: "/icons/communities/sleep.png",
  },
  {
    name: "Longevity",
    memberCount: 12394,
    icon: "/icons/communities/longevity.png",
  },
  {
    name: "Weight Loss",
    memberCount: 32962,
    icon: "/icons/communities/weight-loss.png",
  },
  {
    name: "Meditation",
    memberCount: 158979,
    icon: "/icons/communities/meditation.png",
  },
  {
    name: "Anxiety",
    memberCount: 102743,
    icon: "/icons/communities/anxiety.png",
  },
  {
    name: "Chronic Pain",
    memberCount: 9322,
    icon: "/icons/communities/chronic-pain.png",
  },
  {
    name: "Cardiovascular",
    memberCount: 19556,
    icon: "/icons/communities/cardiovascular.png",
  },
  {
    name: "Blood Sugar",
    memberCount: 83967,
    icon: "/icons/communities/blood-sugar.png",
  },
];

export const experiment: IExperiment = {
  title: "Meditate twice daily and measure deep sleep",
  status: ExperimentStatus.ACTIVE,
  createdBy: user,
  startDate: new Date(2022, 3, 1),
  endDate: new Date(2022, 3, 12),
  updatedAt: new Date(2022, 3, 5),
  createdAt: new Date(2022, 2, 28),
  communities: [communities[0], communities[1]],
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
          markerValue: {
            value: 54,
            prettified: "54 BPM",
          },
        },
        {
          date: new Date(2022, 8, 7),
          markerValue: {
            value: 48,
            prettified: "48 BPM",
          },
        },
      ],
      lastChange: {
        type: MarkerValueChangeType.NEGATIVE,
        percentage: Math.round(600 / 48),
        value: 6,
      },
    },
    {
      marker: experimentResultMarkers[1],
      history: [
        {
          date: new Date(),
          markerValue: {
            value: 132,
            prettified: "2 hr 12 min",
          },
        },
        {
          date: new Date(2022, 8, 7),
          markerValue: {
            value: 105,
            prettified: "1 hr 45 min",
          },
        },
      ],
      lastChange: {
        type: MarkerValueChangeType.POSITIVE,
        percentage: Math.round(2700 / 105),
        value: 27,
      },
    },
    {
      marker: experimentResultMarkers[2],
      history: [
        {
          date: new Date(),
          markerValue: {
            value: 30,
            prettified: "48 ms",
          },
        },
        {
          date: new Date(2022, 8, 7),
          markerValue: {
            value: 32,
            prettified: "32 ms",
          },
        },
      ],
      lastChange: {
        type: MarkerValueChangeType.NEGATIVE,
        percentage: -1 * Math.round(200 / 32),
        value: -2,
      },
    },
  ],
};
