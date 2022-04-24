import { ExperimentResultMarker } from '../../modules/experiments/entities/experiment.entity';

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
    slug: 'sleep',
    more_is_better: true,
  },
  {
    name: 'REM Sleep',
    unit: 'minutes',
    slug: 'sleep',
    more_is_better: true,
  },
  {
    name: 'Sleep',
    unit: 'minutes',
    slug: 'sleep',
    more_is_better: true,
  },
  {
    name: 'HRV',
    unit: 'milliseconds',
    slug: 'hrv',
    more_is_better: true,
  },
];
