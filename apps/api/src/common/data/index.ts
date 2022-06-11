import { ExperimentResultMarker } from '../../modules/experiments/entities/experiment.entity';
import type { ICommunity } from '@reputable/types';

export const experimentResultMarkers: ExperimentResultMarker[] = [
  {
    name: 'Resting Heart Rate',
    slug: 'resting-heart-rate',
    devices: ['Ourora Ring'],
  },
  {
    name: 'Deep Sleep',
    slug: 'sleep',
  },
  {
    name: 'REM Sleep',
    slug: 'sleep',
  },
  {
    name: 'Sleep',
    slug: 'sleep',
  },
  {
    name: 'HRV',
    slug: 'hrv',
  },
];

export const communities: Omit<ICommunity, '_id'>[] = [
  {
    name: 'Sleep',
    icon: 'https://drive.google.com/uc?id=1kHhGvQNewsLJmVptDD_EjAQzXLgB4sig',
    slug: 'sleep',
    memberCount: 0,
    order: 1,
    bgColor: 'blue.50',
    textColor: 'blue.500',
  },
  {
    name: 'Longevity',
    icon: 'https://drive.google.com/uc?id=1AQwkYEVabHlXM5BbgAm4pnrLdlfEgdXp',
    slug: 'longevity',
    memberCount: 0,
    bgColor: 'green.50',
    textColor: 'green.500',
  },
  {
    name: 'Weight Loss',
    icon: 'https://drive.google.com/uc?id=1sLYxSlC8g40NGBNHGZLzttf7fnlrGIhJ',
    slug: 'weight-loss',
    memberCount: 0,
    bgColor: 'purple.50',
    textColor: 'primary.500',
  },
  {
    name: 'Meditation',
    icon: 'https://drive.google.com/uc?id=1Z1Q_2Nod79IZ9qWs8d07qH582v05VQtB',
    slug: 'meditation',
    memberCount: 0,
    bgColor: 'cyan.50',
    textColor: 'cyan.500',
  },
  {
    name: 'Anxiety',
    icon: 'https://drive.google.com/uc?id=1Q8oQhwioKN_WQ7jogqENOdYnJKIeH4OS',
    slug: 'anxiety',
    memberCount: 0,
    bgColor: 'pink.50',
    textColor: 'pink.500',
  },
  {
    name: 'Chronic Pain',
    icon: 'https://drive.google.com/uc?id=1dV7c891-rex0axNNcpRjEVy5HmWe0o1x',
    slug: 'chronic-pain',
    memberCount: 0,
    bgColor: 'gray.50',
    textColor: 'gray.500',
  },
  {
    name: 'Cardiovascular',
    icon: 'https://drive.google.com/uc?id=16CUC0HUQIq5NRP3gF0DFWOyUcNEdH2QY',
    slug: 'cardiovascular',
    memberCount: 0,
    bgColor: 'red.50',
    textColor: 'red.500',
  },
  {
    name: 'Blood Sugar',
    icon: 'https://drive.google.com/uc?id=1TgLWQfpU7AddazWNZk_mK6auvZnUVCTE',
    slug: 'blood-sugar',
    memberCount: 0,
    bgColor: 'yellow.50',
    textColor: 'yellow.500',
  },
  {
    name: 'Sexual Health',
    icon: 'https://drive.google.com/uc?id=1hhIp4J69EZxWQEzSsYK9aeYuuMmudRJW',
    slug: 'sexual-health',
    memberCount: 0,
    bgColor: 'secondary.50',
    textColor: 'secondary.500',
  },
];
