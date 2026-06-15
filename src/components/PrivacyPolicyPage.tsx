// Full privacy policy for App Store submission.
// Accessible at minutebank.app/privacy

import LegalPageLayout from './LegalPageLayout';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article>
      <h2 className="font-medium text-[#1a1a1a] text-[18px] lg:text-[20px] mb-3">{title}</h2>
      {children}
    </article>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="April 4, 2026">

      <Section title="1. Introduction">
        <p>
          Welcome to MinuteBank ("we," "us," or "our"). This policy explains
          how the app handles your data. The developer's identity and contact
          information are provided in Section 13.
        </p>
      </Section>

      <Section title="2. Data We Collect for App Functionality">
        <p className="mb-3">
          The following data may be synced to Supabase or otherwise processed as
          part of authentication, cross-device sync, social features, and
          account management. These data types are collected for app
          functionality only — not for advertising or cross-app tracking.
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Name or display name and email address</li>
          <li>User account identifier and device identifier</li>
          <li>Push notification device tokens</li>
          <li>Focus session history, timer/challenge activity, coin balance, goals, tags, and settings</li>
          <li>Social data and app content you create, such as friends, group memberships, invites, usernames, avatars, and leaderboard participation</li>
        </ul>
      </Section>

      <Section title="3. Data That Stays on Your Device">
        <p className="mb-3">This data never leaves your device:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Blocked app selections (Screen Time / FamilyControls tokens)</li>
          <li>App usage time tracked by the system</li>
          <li>Widget and Live Activity state</li>
          <li>Apple Watch sync state</li>
        </ul>
      </Section>

      <Section title="4. Data We Do Not Collect for Advertising or Cross-App Tracking">
        <ul className="list-disc pl-6 space-y-1">
          <li>Exact GPS location or any MinuteBank location permission prompt</li>
          <li>Your iPhone address book, photos, or media library</li>
          <li>Browsing history</li>
          <li>Advertising identifiers</li>
          <li>Data from other apps for ad targeting</li>
        </ul>
      </Section>

      <Section title="5. Third-Party Services">
        <ul className="list-disc pl-6 space-y-1 mb-3">
          <li><strong>Supabase</strong> — database hosting, authentication, realtime sync, and push-token storage</li>
          <li><strong>Apple</strong> — Sign In with Apple, Screen Time APIs, push notifications, and StoreKit for purchases</li>
          <li><strong>Google</strong> — Sign In with Google (alternative login option). If you choose Google Sign-In, Google may process your IP address to estimate general location for fraud prevention. Google's privacy policy governs that authentication flow.</li>
          <li><strong>Sentry</strong> — crash reports and diagnostic data used only to detect and fix bugs. We send IP address stripped and we do not attach your account, email, or username to these reports. Not used for advertising, profiling, or analytics. Sentry's privacy policy governs how Sentry processes this data.</li>
          <li><strong>Airbridge</strong> — measures how effective our own app-install ads are, for example TikTok campaigns, using Apple's privacy-preserving SKAdNetwork. We use Airbridge's restricted SDK, so it does not collect your advertising identifier (IDFA) and does not track you across other apps or websites, and it shows no app-tracking permission prompt. Airbridge's privacy policy governs how it processes this data.</li>
        </ul>
        <p>
          MinuteBank does not request device location permission and does not
          use location for advertising. We do not embed any advertising network
          SDK and do not show ads inside the app. We use Airbridge only to
          measure how many installs our own ad campaigns produce, through
          Apple's privacy-preserving SKAdNetwork and without your advertising
          identifier. Apple may also collect crash diagnostics per Apple's own
          privacy policy if you have opted in on your device.
        </p>
      </Section>

      <Section title="6. In-App Purchases">
        <p>
          Purchases are processed by Apple through StoreKit. We do not receive or
          store your payment information. Purchase and subscription status is not
          stored on our servers — it is verified locally on your device through
          Apple's StoreKit APIs. Apple's privacy policy governs payment processing.
        </p>
      </Section>

      <Section title="7. Data Retention">
        <p>
          We retain your data as long as your account is active. If you delete
          your account, all data is permanently removed from our servers within
          30 days.
        </p>
      </Section>

      <Section title="8. Account & Data Deletion">
        <p>
          You can delete your account from within the app (Settings &gt; Your Data
          &gt; Delete Account). This permanently removes all your data from our
          servers. On-device data is cleared locally.
        </p>
      </Section>

      <Section title="9. Children's Privacy">
        <p>
          MinuteBank is not directed at children under 13. We do not knowingly
          collect data from children under 13. If you believe a child has provided
          data, contact us to have it removed.
        </p>
      </Section>

      <Section title="10. Your Rights">
        <p>
          You can request access to, correction of, or deletion of your personal
          data at any time by emailing{' '}
          <a href="mailto:support@minutebank.app" className="text-[#e87a55] hover:underline">
            support@minutebank.app
          </a>.
          We respond within 30 days. This applies to all users regardless of
          location (GDPR, CCPA, and equivalent regulations).
        </p>
      </Section>

      <Section title="11. Data Security">
        <p>
          Data is transmitted over HTTPS and stored in Supabase's secured
          infrastructure. Authentication uses Sign in with Apple or Sign in with
          Google, depending on the provider you choose.
        </p>
      </Section>

      <Section title="12. Changes to This Policy">
        <p>
          We may update this policy. Changes will be posted on this page with an
          updated effective date.
        </p>
      </Section>

      <Section title="13. Contact">
        <p>
          Berfin Aydin<br />
          Email:{' '}
          <a href="mailto:support@minutebank.app" className="text-[#e87a55] hover:underline">
            support@minutebank.app
          </a><br />
          Phone: (617) 250-7663
        </p>
      </Section>

    </LegalPageLayout>
  );
}
