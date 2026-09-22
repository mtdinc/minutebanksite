
export const PRICES = {
  monthly: '$5.99',
  yearly: '$34.99',
  lifetime: '$79.99',
} as const;

export const TRIAL_LENGTH_TEXT = 'two weeks';
export const TRIAL_LENGTH_ADJECTIVE = 'two-week';

export const FREE_INCLUDES: string[] = [
  'Focus timer: count-up, countdown, and Endurance Challenge',
  'Coins and time banks',
  'App Lock for two individual apps on iPhone and iPad',
  'Daily goals and 3 tags',
  'Session history and basic stats',
  'Streaks and the friends leaderboard',
  'Group challenges',
  'Account sync',
];

export interface ProFeature {
  title: string;
  detail: string;
}

export const PRO_FEATURES: ProFeature[] = [
  {
    title: 'Unlimited App Lock',
    detail: 'Unlimited apps, websites and categories; scheduled locks and Auto Mode',
  },
  {
    title: 'Instant sync',
    detail: 'A running timer follows you across iPhone, iPad, and Mac, and changes arrive in seconds',
  },
  {
    title: 'Advanced stats',
    detail: 'Timelines, heatmaps, comparisons, and history',
  },
  {
    title: 'Unlimited tags',
    detail: 'Track every subject and project separately',
  },
  {
    title: 'CSV export',
    detail: 'Download every session',
  },
];

export const GRANDFATHER_TEXT =
  'Set up App Lock before version 1.4? It stays yours on that device at no cost.';

export const REGION_NOTE = 'Prices in USD, billed through Apple. They may vary by region.';
