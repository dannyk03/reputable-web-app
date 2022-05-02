import { ExperimentResultMarker } from '../../modules/experiments/entities/experiment.entity';
import { ICommunity } from '@reputable/types';

export const experimentResultMarkers: ExperimentResultMarker[] = [
  {
    name: 'Resting Heart Rate',
    slug: 'resting-heart-rate',
    devices: ['Ourora Ring']
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
    memberCount: 45321,
    icon: '/icons/communities/sleep.png',
    slug: 'sleep',
  },
  {
    name: 'Longevity',
    memberCount: 12394,
    icon: '/icons/communities/longevity.png',
    slug: 'longevity',
  },
  {
    name: 'Weight Loss',
    memberCount: 32962,
    icon: '/icons/communities/weight-loss.png',
    slug: 'weight-loss',
  },
  {
    name: 'Meditation',
    memberCount: 158979,
    icon: '/icons/communities/meditation.png',
    slug: 'meditation',
  },
  {
    name: 'Anxiety',
    memberCount: 102743,
    icon: '/icons/communities/anxiety.png',
    slug: 'anxiety',
  },
  {
    name: 'Chronic Pain',
    memberCount: 9322,
    icon: '/icons/communities/chronic-pain.png',
    slug: 'chronic-pain',
  },
  {
    name: 'Cardiovascular',
    memberCount: 19556,
    icon: '/icons/communities/cardiovascular.png',
    slug: 'cardiovascular',
  },
  {
    name: 'Blood Sugar',
    memberCount: 83967,
    icon: '/icons/communities/blood-sugar.png',
    slug: 'blood-sugar',
  },
];
