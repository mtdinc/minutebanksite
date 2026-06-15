// Help / FAQ page. Accessible at minutebank.app/help.
// Single page, left-rail anchor nav (lg+), all answers collapsed via <details> so Cmd+F still searches them.

import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import Footer from './Footer';

interface FaqItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

interface FaqSection {
  id: string;
  title: string;
  items: FaqItem[];
}

const SUPPORT_EMAIL = 'support@minutebank.app';

const FAQ_SECTIONS: FaqSection[] = [
  {
    id: 'quick-start',
    title: '1. Quick Start',
    items: [
      {
        id: 'first-install',
        question: 'What should I do right after installing MinuteBank?',
        answer: (
          <>
            <ol className="list-decimal pl-6 space-y-1">
              <li>Create a free MinuteBank account with your email. This is what links your data across devices.</li>
              <li>Grant Screen Time permission so you can block distracting apps and websites.</li>
              <li>Add at least one tag (a bundle of apps to block) and pick which apps go in it.</li>
              <li>Start your first focus session from the home screen. You earn coins as you focus.</li>
            </ol>
          </>
        ),
      },
      {
        id: 'do-i-need-account',
        question: 'Do I need an account, or can I skip it?',
        answer: (
          <p>
            Strongly recommended. Without an account, your coins, sessions, and streaks live only on this device. Reinstalling the app, switching to a new phone, or adding a Mac will wipe progress. Sign-up takes 30 seconds and uses just your email.
          </p>
        ),
      },
      {
        id: 'what-to-install-where',
        question: 'What should I install on iPhone vs iPad vs Mac vs Watch?',
        answer: (
          <>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>iPhone:</strong> the main experience. Required.</li>
              <li><strong>iPad:</strong> install if you want focus sessions on iPad too. Sessions sync to iPhone.</li>
              <li><strong>Mac:</strong> lives in your menu bar. Great for desk work.</li>
              <li><strong>Apple Watch:</strong> auto-installs when iPhone has the app. Lets you start and stop sessions from your wrist.</li>
            </ul>
            <p className="mt-3">
              The important part: sign into the <strong>same MinuteBank email</strong> on every device. Apple's Universal Purchase shares Pro across devices, but only your MinuteBank login shares your data.
            </p>
          </>
        ),
      },
      {
        id: 'first-blocking-setup',
        question: 'How do I set up app blocking the first time?',
        answer: (
          <>
            <ol className="list-decimal pl-6 space-y-1">
              <li>From the Home tab, tap App Lock.</li>
              <li>Add a tag, name it (e.g. "Deep Work"), and pick the apps you want to block. Pick the websites you want to block from the system Screen Time picker.</li>
              <li>Start a focus session and pick that tag. The picked apps and websites are shielded for the whole session.</li>
            </ol>
            <p className="mt-3 text-[#71717a]">
              Free users get 3 tags total (one default plus two custom). Pro is unlimited. Blocking itself is free for everyone.
            </p>
          </>
        ),
      },
    ],
  },
  {
    id: 'account-sync',
    title: '2. Account, Purchases & Sync',
    items: [
      {
        id: 'pro-not-showing',
        question: "Why isn't my Pro upgrade showing on my Mac or iPad?",
        answer: (
          <>
            <p className="mb-3">
              This is the single most common confusion, so let's split it cleanly:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Apple Universal Purchase</strong> handles your <em>subscription</em>. Buying Pro on iPhone covers iPad and Mac automatically, as long as the same Apple ID is signed into the App Store on each device.
              </li>
              <li>
                <strong>Your MinuteBank account</strong> handles your <em>data</em>: coins, sessions, streaks, groups. None of that crosses devices unless you sign into the same MinuteBank email on each one.
              </li>
            </ul>
            <p className="mt-3">
              If your iPad is showing Free, you almost certainly need to sign into your MinuteBank account inside the app (Settings &gt; Account). If Pro features are still missing after that, tap Settings &gt; Subscription &gt; Restore Purchases.
            </p>
          </>
        ),
      },
      {
        id: 'sync-truth-table',
        question: "What syncs across devices, and what doesn't?",
        answer: (
          <>
            <div className="overflow-x-auto -mx-2">
              <table className="w-full text-[13px] lg:text-[14px] border-collapse">
                <thead>
                  <tr className="border-b border-[#e0e0dd]">
                    <th className="text-left py-2 pr-3 font-medium text-[#1a1a1a]">What</th>
                    <th className="text-left py-2 px-3 font-medium text-[#1a1a1a]">Free</th>
                    <th className="text-left py-2 px-3 font-medium text-[#1a1a1a]">Pro</th>
                  </tr>
                </thead>
                <tbody className="text-[#555555]">
                  <tr className="border-b border-[#e0e0dd]/60"><td className="py-2 pr-3">Coins, session history, streaks</td><td className="py-2 px-3">Yes</td><td className="py-2 px-3">Yes</td></tr>
                  <tr className="border-b border-[#e0e0dd]/60"><td className="py-2 pr-3">Tags &amp; blocking rules</td><td className="py-2 px-3">Yes</td><td className="py-2 px-3">Yes</td></tr>
                  <tr className="border-b border-[#e0e0dd]/60"><td className="py-2 pr-3">Live timer ticking on a second device</td><td className="py-2 px-3">No</td><td className="py-2 px-3">Yes</td></tr>
                  <tr className="border-b border-[#e0e0dd]/60"><td className="py-2 pr-3">Apple Watch full timer features</td><td className="py-2 px-3">No</td><td className="py-2 px-3">Yes</td></tr>
                  <tr><td className="py-2 pr-3">Group Challenges</td><td className="py-2 px-3">Yes</td><td className="py-2 px-3">Yes</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-[#71717a]">
              Free accounts still sync sessions after they finish; what they don't get is the live tick-by-tick continuity (start on iPhone, watch the seconds count down on Mac).
            </p>
          </>
        ),
      },
      {
        id: 'wrong-email',
        question: 'I signed up with the wrong email by mistake. How do I switch?',
        answer: (
          <p>
            The cleanest path: sign out of the wrong account, sign up with the right one, and start fresh. Account merging isn't supported yet. If you have meaningful history on the wrong account, email <a className="text-[#1a9e94] hover:underline" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> and we'll do what we can manually.
          </p>
        ),
      },
      {
        id: 'sync-checklist',
        question: "My data isn't syncing between devices. What do I check?",
        answer: (
          <ol className="list-decimal pl-6 space-y-1">
            <li>Same MinuteBank email signed in on every device? Open Settings inside MinuteBank — your email shows at the top.</li>
            <li>Each device has internet?</li>
            <li>Force-quit the app on both devices and reopen.</li>
            <li>On the home screen, pull down to refresh.</li>
            <li>If it's still off, sign out and back in on the device that's behind.</li>
            <li>Check that you're on iOS 18+, iPadOS 18+, or macOS 15+ (older versions can't sync).</li>
            <li>Live timer continuity (timer ticking in real time on a second device) is Pro-only. Free accounts sync sessions after they end, not while they run.</li>
          </ol>
        ),
      },
      {
        id: 'offline',
        question: 'Can I use MinuteBank without internet?',
        answer: (
          <p>
            Yes. Timers, coins, blocking, the wallet, and Reward time all work fully offline. Your changes sync to the cloud the next time you're online.
          </p>
        ),
      },
      {
        id: 'reinstall-data',
        question: 'If I delete the app, do I lose my coins and streaks?',
        answer: (
          <p>
            With a MinuteBank account: no. Reinstall, sign in, and your data comes back from the cloud.<br />
            Without an account: yes, deleting the app wipes everything. This is the single biggest reason we recommend signing up.
          </p>
        ),
      },
    ],
  },
  {
    id: 'pro-billing',
    title: '3. Pro Subscription & Billing',
    items: [
      {
        id: 'pro-features',
        question: "What's included in Pro versus Free?",
        answer: (
          <>
            <p className="mb-2"><strong>Free includes:</strong> all core focus features, app and website blocking with up to 3 tags, full session history, basic stats, group viewing.</p>
            <p><strong>Pro adds:</strong> live timer continuity across iPhone, iPad, Mac, and Watch; full Apple Watch timer features; unlimited tags; Group Challenge participation; advanced stats and exports.</p>
          </>
        ),
      },
      {
        id: 'yearly-trial',
        question: 'Does the yearly plan include a free trial?',
        answer: (
          <p>
            Yes. Yearly Pro starts with 7 days free. Monthly Pro has no trial. The trial is per-account and one-time only, so picking yearly first is the way to try Pro at no cost.
          </p>
        ),
      },
      {
        id: 'restore-purchases',
        question: 'How do I restore purchases on a new device?',
        answer: (
          <p>
            Inside MinuteBank: Settings &gt; Subscription &gt; Restore Purchases. This is an Apple-side action and works for any device signed into the same Apple ID that bought Pro. After it finishes, also confirm you're signed into the same MinuteBank email so your data shows up too.
          </p>
        ),
      },
      {
        id: 'cancel',
        question: 'How do I cancel my subscription?',
        answer: (
          <>
            <p>
              On iPhone: open Apple's Settings app (not MinuteBank) &gt; tap your name at the top &gt; Subscriptions &gt; MinuteBank &gt; Cancel Subscription. By App Store policy, Apple owns the cancel button.
            </p>
            <p className="mt-2 text-[#71717a]">You keep Pro until the end of the period you've already paid for.</p>
          </>
        ),
      },
      {
        id: 'refund',
        question: 'How do I request a refund?',
        answer: (
          <p>
            Apple owns refunds. Visit <a className="text-[#1a9e94] hover:underline" href="https://reportaproblem.apple.com" target="_blank" rel="noopener noreferrer">reportaproblem.apple.com</a>, find your MinuteBank purchase, and submit a request. We can't refund directly because we never see the money; Apple does. We can help with anything related to your account or data.
          </p>
        ),
      },
      {
        id: 'family-sharing',
        question: 'Does Apple Family Sharing work?',
        answer: (
          <p>
            Yes for the subscription. One Pro purchase covers up to 6 family members through Family Sharing. Each person still needs their own MinuteBank account (with their own email) for their own coins, sessions, and streaks. Family doesn't pool data, only the subscription.
          </p>
        ),
      },
    ],
  },
  {
    id: 'blocking',
    title: '4. App & Website Blocking',
    items: [
      {
        id: 'how-blocking-works',
        question: 'How does app blocking work, and why does it ask for Screen Time permission?',
        answer: (
          <p>
            Apple's Screen Time framework (FamilyControls) is the only way iOS lets a third-party app shield other apps. We ask for permission once. You pick which apps and websites to block. During focus sessions, iOS shows a custom shield in front of those apps. We never see what apps you use; iOS handles all of that internally and only tells our app whether the shield is on or off.
          </p>
        ),
      },
      {
        id: 'tags-explained',
        question: 'What is a "tag" and why is Free limited to 3?',
        answer: (
          <p>
            A tag is a named focus context with its own list of apps to block. Example: a "Deep Work" tag set to block Instagram, TikTok, and X. When you start a focus session, you pick the tag and those apps are shielded for the session. Website blocking is set up once at the App Lock level (apply to all sessions). Free users get 3 tags (one default plus two custom). Pro is unlimited. Blocking itself is free for everyone; the tag count is the only Free/Pro split.
          </p>
        ),
      },
      {
        id: 'shield-not-appearing',
        question: "The shield isn't appearing during a focus session. How do I fix it?",
        answer: (
          <ol className="list-decimal pl-6 space-y-1">
            <li>Apple Settings app &gt; Screen Time &gt; confirm permission is granted to MinuteBank.</li>
            <li>In MinuteBank, open the tag and confirm at least one app or website is selected.</li>
            <li>Make sure the focus session is attached to that tag (pick the tag from the timer screen).</li>
            <li>iOS sometimes evicts shield extensions. Force-quit MinuteBank and start a new session.</li>
            <li>If it still won't show, restart the device. iOS rebuilds the Screen Time stack on reboot.</li>
          </ol>
        ),
      },
      {
        id: 'block-websites',
        question: 'Does it block websites in Safari and other browsers?',
        answer: (
          <p>
            Yes for Safari and any browser built on Apple's WebKit engine (which is most of them on iOS). Add a website domain to your blocked list inside App Lock and it's blocked system-wide while a focus session is active.
          </p>
        ),
      },
      {
        id: 'blocking-ipad-mac',
        question: 'Does blocking work on iPad and Mac?',
        answer: (
          <p>
            iPad: yes, the same way as iPhone. Mac: limited. Apple's Screen Time API on macOS doesn't expose the same shield surface, so the Mac app focuses on tracking, sync, and the menu-bar timer. Active app blocking on Mac is something we're watching for as Apple expands the API.
          </p>
        ),
      },
    ],
  },
  {
    id: 'timers',
    title: '5. Timers & Focus Modes',
    items: [
      {
        id: 'three-timers',
        question: 'Study, Reward, and Challenge timers — what are they?',
        answer: (
          <>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Study (focus):</strong> set a duration, focus, earn 1 coin per minute. The shield is up for the whole session. Works for any focus task, not only studying.</li>
              <li><strong>Reward (leisure):</strong> spend coins to unlock app time. The Reward timer ticks the spending down so you know when your break ends.</li>
              <li><strong>Challenge:</strong> structured pomodoro-style sessions with multiple rounds and rest breaks. Best for long deep work blocks.</li>
            </ul>
          </>
        ),
      },
      {
        id: 'two-timers-at-once',
        question: 'Can I run two timers at the same time?',
        answer: (
          <p>
            No. Study, Reward, and Challenge are mutually exclusive. Starting one stops the other. This is by design so minutes never get double-counted.
          </p>
        ),
      },
      {
        id: 'group-challenge',
        question: "What's a Group Challenge versus a personal Challenge?",
        answer: (
          <p>
            A personal Challenge is a structured pomodoro session for you alone. A Group Challenge is a shared minute target inside a study group: any member can start one, and everyone in the group contributes minutes toward the total. Pro is required to participate fully.
          </p>
        ),
      },
      {
        id: 'pause',
        question: 'When can I pause a session?',
        answer: (
          <p>
            Pause is available during Study sessions. The timer freezes, the shield stays up, and time spent paused doesn't count toward the session. Resume picks up where you left off.
          </p>
        ),
      },
      {
        id: 'edit-past-session',
        question: 'I forgot to stop my timer. Can I edit a past session?',
        answer: (
          <p>
            Yes. Open the History tab, tap the pencil on the session, and adjust the minutes. Edits that reduce a session can charge "correction debt" against your coin balance. Correction debt is capped at -20 coins so a single edit can't drain your wallet.
          </p>
        ),
      },
    ],
  },
  {
    id: 'coins',
    title: '6. Coins & Wallet',
    items: [
      {
        id: 'earn-coins',
        question: 'How do I earn coins?',
        answer: (
          <p>
            1 coin per minute of Study (focus) time. Group Challenges and streak milestones can add small bonuses on top.
          </p>
        ),
      },
      {
        id: 'wallet-cap',
        question: 'Why did my coins stop at 450?',
        answer: (
          <p>
            The wallet has a hard cap of 450 coins. Once you're full, additional coins from new sessions are discarded and you'll see a "wallet full" toast. This keeps the economy honest: spend some coins (Reward time, goals) and you'll start earning again. Streaks and stats keep accumulating regardless of the cap.
          </p>
        ),
      },
      {
        id: 'spend-coins',
        question: 'What can I spend coins on?',
        answer: (
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Reward time:</strong> unlock blocked apps for a set number of minutes.</li>
            <li><strong>Goals:</strong> save up toward milestones you set yourself.</li>
          </ul>
        ),
      },
    ],
  },
  {
    id: 'devices',
    title: '7. Devices, Widgets & Notifications',
    items: [
      {
        id: 'pair-watch',
        question: 'How do I pair my Apple Watch with MinuteBank?',
        answer: (
          <p>
            If your iPhone has MinuteBank installed and your Apple Watch is paired with that iPhone, the Watch app installs automatically. Open it on your Watch and sign in with the same email if it asks. Live timer features on the Watch require Pro.
          </p>
        ),
      },
      {
        id: 'watch-out-of-sync',
        question: 'My Watch shows a different state than my phone. What now?',
        answer: (
          <p>
            Pull down to refresh inside the Watch app. If it's still off, force-quit and reopen the iPhone app — the Watch syncs from iPhone, so refreshing the gateway fixes most cases.
          </p>
        ),
      },
      {
        id: 'watch-start-stop',
        question: 'Can I start and stop sessions from the Watch?',
        answer: (
          <p>
            Yes. The active timer continuity that makes Watch shine across devices needs Pro (the same tier that powers iPhone↔Mac live sync).
          </p>
        ),
      },
      {
        id: 'mac-no-dock',
        question: "Why isn't the Mac app in my Dock, and how do I open the sidebar layout?",
        answer: (
          <p>
            By design. The Mac app lives in the menu bar (top-right of your screen), not the Dock, so it stays out of your way. Click the menu bar icon to open the popover. To get the full sidebar window with Home, Stats, Goals, History, Subscription, and Settings tabs, click <strong>Open Main Window</strong> in the popover footer. (For preferences alone, Cmd+, opens a standard macOS Settings window.)
          </p>
        ),
      },
      {
        id: 'add-widget',
        question: 'How do I add the home screen or lock screen widget?',
        answer: (
          <p>
            Long-press an empty area on your home screen, tap the + in the top-left, search "MinuteBank", and pick a widget size. The widget can show your active timer, today's coins, or weekly minutes. Tapping Start on the widget begins a session without opening the app.
          </p>
        ),
      },
      {
        id: 'lock-screen-timer',
        question: 'How do I show the timer on my Lock Screen or Dynamic Island?',
        answer: (
          <p>
            Live Activity is automatic. Start a focus session and the timer appears on your Lock Screen. On iPhone 14 Pro and newer, it also lives in the Dynamic Island. No setup needed.
          </p>
        ),
      },
      {
        id: 'widget-stuck',
        question: 'My widget is stuck on "TIMER ACTIVE" but no timer is running.',
        answer: (
          <p>
            iOS refreshes widgets lazily. Open the app once to force a refresh. If it still shows the wrong state, remove the widget from your home screen and re-add it.
          </p>
        ),
      },
      {
        id: 'no-notifications',
        question: "Why aren't I getting notifications?",
        answer: (
          <ol className="list-decimal pl-6 space-y-1">
            <li>Apple Settings app &gt; Notifications &gt; MinuteBank &gt; Allow Notifications on.</li>
            <li>Inside MinuteBank: Settings &gt; Notifications &gt; turn on the categories you care about (focus reminders, group activity, milestones).</li>
            <li>Check that an Apple Focus mode (Do Not Disturb, Sleep, Work) isn't filtering us out.</li>
          </ol>
        ),
      },
    ],
  },
  {
    id: 'groups',
    title: '8. Groups & Leaderboard',
    items: [
      {
        id: 'join-group',
        question: "How do I join a friend's group?",
        answer: (
          <p>
            Ask your friend for the invite link or the 8-character group code (formatted XXXX-XXXX). Open MinuteBank, go to the Social tab, tap Join Group, and paste the code. If you tap an invite link on your phone, the app opens directly to the join screen.
          </p>
        ),
      },
      {
        id: 'who-creates-challenge',
        question: 'Who can create a Group Challenge?',
        answer: (
          <p>
            Any member of a group can create one. Pick a duration target (e.g. 600 minutes over 7 days), and all group members' focus minutes count toward the total automatically.
          </p>
        ),
      },
      {
        id: 'leaderboard',
        question: 'How is the leaderboard ranked?',
        answer: (
          <p>
            Two factors: your master streak and your weekly plus minutes (focus minutes earned this week). Friends and groups each have their own boards.
          </p>
        ),
      },
    ],
  },
  {
    id: 'privacy-data',
    title: '9. Privacy, Data, Reset & Delete',
    items: [
      {
        id: 'what-data',
        question: 'What data does MinuteBank collect?',
        answer: (
          <p>
            Just what's needed to run the app: account email, focus session history, coin balance, group memberships, push token. We use Sentry for crash diagnostics and Airbridge to measure how well our own ad campaigns perform. No advertising IDs (IDFA), no cross-app tracking, no selling of data ever. Full breakdown on the <Link className="text-[#1a9e94] hover:underline" to="/privacy">Privacy Policy</Link>.
          </p>
        ),
      },
      {
        id: 'reset-vs-delete',
        question: 'How do I restart my progress without deleting my account?',
        answer: (
          <>
            <p className="mb-2">Two separate actions inside Settings &gt; Data &amp; Privacy:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Reset Data:</strong> wipes all coins, sessions, and streaks across every device. Your account stays. Use this to start over with a clean slate.</li>
              <li><strong>Delete Account:</strong> wipes data <em>and</em> deletes your account permanently. No recovery.</li>
            </ul>
          </>
        ),
      },
      {
        id: 'export-data',
        question: 'How do I export my data?',
        answer: (
          <p>
            Settings &gt; Data &amp; Privacy &gt; Export Data. You'll get a JSON snapshot you can save or share.
          </p>
        ),
      },
    ],
  },
  {
    id: 'troubleshooting',
    title: '10. Troubleshooting & Requirements',
    items: [
      {
        id: 'realtime-lag',
        question: 'Real-time sync feels slow or out of order.',
        answer: (
          <p>
            Live timer sync is Pro-only. Free accounts sync sessions after they finish, not while they're running. If you're on Pro and it's still laggy, try: turn airplane mode on and off, switch off VPN if you have one, and force-quit and reopen the app on each device.
          </p>
        ),
      },
      {
        id: 'crash-report',
        question: 'The app crashed. How do I report it?',
        answer: (
          <p>
            Crash reports are sent automatically (anonymized, no personal data). If you want a follow-up, email <a className="text-[#1a9e94] hover:underline" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> with what you were doing when it happened — that helps us reproduce.
          </p>
        ),
      },
      {
        id: 'iphone-mac-different',
        question: 'iPhone and Mac show different daily minutes for the same day.',
        answer: (
          <p>
            Most often this is a sync lag. Force-quit and reopen both. If it persists past a few minutes, sign out and back in on the device that's behind. We're tracking this kind of divergence and improving it actively.
          </p>
        ),
      },
      {
        id: 'os-versions',
        question: 'Which iOS and macOS versions are required?',
        answer: (
          <p>
            iOS 18.0 or newer, iPadOS 18.0 or newer, macOS 15 (Sequoia) or newer. App blocking depends on Apple's iOS 18 Screen Time API, so we can't go lower without losing it.
          </p>
        ),
      },
      {
        id: 'still-stuck',
        question: "I'm stuck on something not covered here.",
        answer: (
          <p>
            Email <a className="text-[#1a9e94] hover:underline" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> with your device, iOS or macOS version, and what you tried. We read every message.
          </p>
        ),
      },
    ],
  },
];

const COMMON_FIXES = [
  { anchor: '#pro-not-showing', label: 'Pro not showing on Mac or iPad' },
  { anchor: '#sync-checklist', label: 'Data not syncing between devices' },
  { anchor: '#shield-not-appearing', label: "Shield isn't appearing" },
  { anchor: '#wallet-cap', label: 'Coins stuck at 450' },
  { anchor: '#restore-purchases', label: 'Restore purchases on a new device' },
  { anchor: '#reset-vs-delete', label: 'Reset Data vs Delete Account' },
];

function FaqItemBlock({ item }: { item: FaqItem }) {
  return (
    <details
      id={item.id}
      className="group border border-[#e0e0dd] bg-white/40 rounded scroll-mt-24 open:bg-white/70 open:shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
    >
      <summary className="cursor-pointer list-none px-4 py-3 flex items-start gap-3 text-[#1a1a1a] text-[14px] lg:text-[15px] font-medium hover:bg-[#e0e0dd]/20 rounded">
        <span
          aria-hidden="true"
          className="mt-1 inline-block w-2 h-2 border-r-2 border-b-2 border-[#71717a] rotate-[-45deg] group-open:rotate-45 transition-transform"
        />
        <span className="flex-1">{item.question}</span>
      </summary>
      <div className="px-4 pb-4 pt-1 pl-9 text-[#555555] text-[14px] lg:text-[15px] leading-[1.7]">
        {item.answer}
      </div>
    </details>
  );
}

function TocLink({
  section,
  active,
  onClick,
}: {
  section: FaqSection;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <a
      href={`#${section.id}`}
      onClick={onClick}
      className={`block py-1.5 text-[13px] transition-colors border-l-2 pl-3 ${
        active
          ? 'border-[#e87a55] text-[#1a1a1a] font-medium'
          : 'border-transparent text-[#71717a] hover:text-[#1a1a1a]'
      }`}
    >
      {section.title}
    </a>
  );
}

export default function HelpPage() {
  const { hash } = useLocation();
  const [activeSection, setActiveSection] = useState<string>(FAQ_SECTIONS[0].id);

  // On mount or hash change, scroll to the targeted anchor and open the matching <details>.
  useEffect(() => {
    if (!hash) return;
    const id = hash.replace('#', '');
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (!el) return false;
      if (el.tagName === 'DETAILS') {
        (el as HTMLDetailsElement).open = true;
      }
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return true;
    };
    if (!tryScroll()) {
      const t = setTimeout(tryScroll, 50);
      return () => clearTimeout(t);
    }
  }, [hash]);

  // Track which section is active in the viewport for left-rail highlighting.
  useEffect(() => {
    const sectionEls = FAQ_SECTIONS
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sectionEls.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0 && visible[0].target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 },
    );

    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#f7f7f5]">
      {/* Minimal header — same pattern as LegalPageLayout */}
      <header className="sticky top-0 z-50 bg-[#f7f7f5]/85 backdrop-blur-md border-b border-[#e0e0dd]/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="h-[60px] max-w-6xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          <Link
            to="/"
            className="font-medium text-[16px] tracking-[0.12em] uppercase hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e87a55] focus-visible:ring-offset-2 rounded"
          >
            <span className="font-bold text-[#B85C3A]">Minute</span>
            <span className="font-normal text-[#1a1a1a]">Bank</span>
          </Link>
          <Link
            to="/"
            className="text-[#71717a] text-[13px] hover:text-[#1a1a1a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e87a55] focus-visible:ring-offset-2 rounded"
          >
            &larr; Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-10 lg:py-16">
        {/* Title */}
        <h1 className="font-medium text-[#1a1a1a] text-[28px] lg:text-[36px] mb-2">
          Help &amp; FAQ
        </h1>
        <p className="text-[#71717a] text-[14px] mb-8">
          Answers to the most common questions about MinuteBank. Use Cmd+F to search; everything's on one page.
        </p>

        {/* Hero callout — the headline support message */}
        <div className="bg-white border border-[#e0e0dd] rounded p-5 lg:p-6 mb-8">
          <p className="text-[#1a1a1a] text-[15px] lg:text-[17px] leading-[1.6]">
            <strong>Buying Pro through Apple unlocks your subscription.</strong>{' '}
            <strong>Signing into the same MinuteBank account syncs your data.</strong>{' '}
            <span className="text-[#71717a]">You need both on each device.</span>
          </p>
        </div>

        {/* Most Common Fixes */}
        <section className="mb-10">
          <h2 className="font-medium text-[#1a1a1a] text-[14px] uppercase tracking-[0.12em] mb-3 text-[#71717a]">
            Most Common Fixes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {COMMON_FIXES.map((fix) => (
              <a
                key={fix.anchor}
                href={fix.anchor}
                className="block bg-white border border-[#e0e0dd] rounded px-4 py-3 text-[14px] text-[#1a1a1a] hover:border-[#e87a55] hover:bg-[#fdf6f3] transition-colors"
              >
                {fix.label}
                <span aria-hidden="true" className="text-[#e87a55] ml-2">&rarr;</span>
              </a>
            ))}
          </div>
        </section>

        {/* 2-column layout: left rail TOC (lg+), main content */}
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12">
          {/* Left rail */}
          <aside
            aria-label="Table of contents"
            className="hidden lg:block"
          >
            <nav className="sticky top-[80px]">
              <p className="font-medium text-[#71717a] text-[12px] uppercase tracking-[0.12em] mb-3">
                Contents
              </p>
              {FAQ_SECTIONS.map((section) => (
                <TocLink
                  key={section.id}
                  section={section}
                  active={section.id === activeSection}
                  onClick={() => setActiveSection(section.id)}
                />
              ))}
            </nav>
          </aside>

          {/* Sections */}
          <div className="space-y-12">
            {FAQ_SECTIONS.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <h2 className="font-medium text-[#1a1a1a] text-[20px] lg:text-[24px] mb-4 pb-2 border-b border-[#e0e0dd]">
                  {section.title}
                </h2>
                <div className="space-y-2">
                  {section.items.map((item) => (
                    <FaqItemBlock key={item.id} item={item} />
                  ))}
                </div>
              </section>
            ))}

            {/* Closing contact card */}
            <section className="bg-white border border-[#e0e0dd] rounded p-5 lg:p-6 mt-12">
              <h2 className="font-medium text-[#1a1a1a] text-[18px] mb-2">Still need help?</h2>
              <p className="text-[#555555] text-[14px] lg:text-[15px] leading-[1.7]">
                Email{' '}
                <a className="text-[#1a9e94] hover:underline" href={`mailto:${SUPPORT_EMAIL}`}>
                  {SUPPORT_EMAIL}
                </a>{' '}
                with your device, iOS or macOS version, and what you've already tried. We read every message.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
