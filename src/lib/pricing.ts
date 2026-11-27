// The one place on the website that states prices, the trial length, and
// what each plan includes. PricingSection, HeroSection, and HelpPage read
// from here, so a price change on the site is an edit to this file only.
//
// From iOS 1.5, a new iPhone or iPad install starts with the yearly trial or
// buys a plan (hard paywall). The Free plan stays for the Mac and for people
// who used MinuteBank before; Help describes it, the pricing section does not.
//
// Prices are US list prices. Apple bills in local currency, so they always
// appear with the "may vary by region" note (REGION_NOTE).

export const PRICES = {
  monthly: '$5.99',
  yearly: '$34.99',
  lifetime: '$79.99',
} as const;

// Length of the free trial on the yearly plan, as offered in the App Store.
export const TRIAL_LENGTH_TEXT = '14 days';
// Same length as an adjective, for "a 14-day free trial".
export const TRIAL_LENGTH_ADJECTIVE = '14-day';

// What every paid plan (and the trial) includes. Mirrors the "14 DAYS FREE,
// THEN PRO" section of the App Store description.
export const EVERY_PLAN_INCLUDES: string[] = [
  'App Lock for any apps, websites, and categories, with scheduled locks and Auto Mode (iPhone and iPad)',
  'Focus timer: count-up, countdown, and Endurance Challenge',
  'Coins and time banks',
  'Daily and weekly goals, unlimited tags, and topics',
  'Advanced stats: timelines, heatmaps, comparisons, and history',
  'Streaks, the friends leaderboard, and group challenges',
  'Instant sync across iPhone, iPad, and Mac',
  'CSV export of every session',
];

// The Free plan, for Help only: the Mac app and people who used MinuteBank
// before 1.5. No App Lock row, so nothing reads as free App Lock for new
// iPhone users.
export const FREE_INCLUDES: string[] = [
  'Focus timer: count-up, countdown, and Endurance Challenge',
  'Coins and time banks',
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

// Pro features listed on the Help page. Same wording and order as the app's
// Pro feature list; change this only when that list changes.
export const PRO_FEATURES: ProFeature[] = [
  {
    title: 'Unlimited App Lock',
    detail: 'Unlimited apps, websites and categories; scheduled locks',
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

export const REGION_NOTE = 'Prices in USD, billed through Apple. They may vary by region.';

// What "lifetime" means: the life of MinuteBank, not the buyer's. Same words as
// the app's paywall and Terms section 4.
export const LIFETIME_TERM_TEXT = 'Pro for as long as MinuteBank is offered.';
