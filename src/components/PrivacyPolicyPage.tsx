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
    <LegalPageLayout title="Privacy Policy" lastUpdated="September 26, 2026">

      <Section title="1. Introduction">
        <p>
          Welcome to MinuteBank ("we," "us," or "our"). This policy explains
          how the app handles your data. The developer's identity and contact
          information are provided in Section 14.
        </p>
      </Section>

      <Section title="2. Data We Collect for App Functionality">
        <p className="mb-3">
          The following data may be synced to Supabase or otherwise processed as
          part of authentication, cross-device sync, social features, and
          account management. These data types are collected for app
          functionality. If you opt in, your email address is also used for the
          email updates described in Section 2b. Third-party services may process
          additional data for the purposes described in Section 5.
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Name or display name and email address</li>
          <li>User account identifier and device identifier</li>
          <li>Push notification device tokens</li>
          <li>Focus session history, timer/challenge activity, coin balance, goals, tags, and settings</li>
          <li>Social data and app content you create, such as friends, group memberships, invites, usernames, avatars, and leaderboard participation</li>
        </ul>
      </Section>

      <Section title="2a. Optional Usage Analytics">
        <p className="mb-3">
          In releases with the “Share usage analytics” control, this collection is
          off until you agree on Welcome or in Data &amp; Privacy. You can use the
          app without agreeing and without creating an account. We record a small
          set of events about setup, completed focus sessions, coin-funded unlocks,
          days the app is active, upgrade screens, and purchase or trial outcomes.
        </p>
        <p className="mb-3">
          These events use a separate random installation identifier, the app
          version, platform, and time rounded to a minute. They are pseudonymous,
          not fully anonymous: events from the same installation can be connected.
          We do not connect this identifier to your account or across your devices.
          This analytics data is stored with Supabase, not sent to an advertising
          network. It is not combined with other companies' data for ad targeting.
        </p>
        <p>
          Usage analytics never includes which apps or websites you block, Screen
          Time tokens, tag or goal names, exact focus durations, payment details,
          receipts, or StoreKit transaction identifiers. Turning the control off
          immediately stops new collection and requests deletion for that
          installation. The app shows when deletion is still waiting for a
          connection. Crash diagnostics are separate from this control.
        </p>
      </Section>

      <Section title="2b. Optional Email Updates">
        <p className="mb-3">
          When you sign in, you can tick “Email me tips and updates.” The box is
          unticked unless you tick it. If you do, we may email you occasional tips
          for using MinuteBank and news about new features. You can sign in
          without ticking it, and you can turn it on or off at any time in the
          app's account settings.
        </p>
        <p>
          We use your account email and, if you shared one, your name. We keep a
          record of your choice, when you made it, and where in the app you made
          it. We do not sell your email or share it with other companies for their
          advertising. If you sign in with Apple and choose Hide My Email, we do
          not send these emails. Turning the setting off stops them.
        </p>
      </Section>

      <Section title="3. Data That Stays on Your Device">
        <p className="mb-3">MinuteBank does not upload this Screen Time data:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Blocked app selections (Screen Time / FamilyControls tokens)</li>
          <li>App usage time tracked by the system</li>
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
          <li><strong>Supabase</strong>: database hosting, authentication, realtime sync, push-token storage, and optional usage analytics</li>
          <li><strong>Apple</strong>, Sign In with Apple, Screen Time APIs, push notifications, and StoreKit for purchases</li>
          <li><strong>Google</strong>: Sign In with Google is an alternative login option. Its SDK may process account and device identifiers, contact details, and usage information for authentication, security, and SDK analytics. Google may use your IP address to estimate general location for fraud prevention. This does not give MinuteBank access to your Google password or phone number. Google's privacy policy governs that authentication flow.</li>
          <li><strong>Sentry</strong>: crash reports and diagnostic data used to detect and fix bugs. We configure Sentry not to add your IP address to diagnostic event payloads. Reports may include a separate diagnostic installation identifier. We do not attach your MinuteBank account, email, or username. Diagnostics are separate from optional usage analytics. Sentry's privacy policy governs its processing.</li>
          <li><strong>Airbridge</strong>: older releases use its restricted SDK for app-install attribution without IDFA. Releases with the optional usage-analytics control no longer start Airbridge. This does not erase data already collected by earlier releases; Airbridge's privacy policy continues to apply to that data.</li>
        </ul>
        <p>
          MinuteBank does not request device location permission and does not
          use location for advertising. We do not embed any advertising network
          SDK and do not show ads inside the app. Apple's aggregate App Store
          reports help us understand downloads and subscriptions without joining
          those reports to your optional analytics identity. Apple may also collect
          crash diagnostics per Apple's own privacy policy if you have opted in
          on your device.
        </p>
      </Section>

      <Section title="6. In-App Purchases">
        <p>
          Purchases are processed by Apple through StoreKit. We do not receive or
          store your payment information. Pro access is verified locally through
          Apple's StoreKit APIs. If you opt in to usage analytics, we store limited
          purchase-attempt and verified-outcome events, including the plan type and
          whether a free trial began. These events do not include receipts,
          StoreKit transaction identifiers, or your account identity, and are not
          used to grant Pro access. Apple's privacy policy governs payment processing.
        </p>
      </Section>

      <Section title="7. Data Retention">
        <p>
          Account data, including your email updates choice, is retained while
          your account is active and is removed within 30 days of account
          deletion. Optional usage analytics is separate:
          each random enrollment and its events are kept for up to 90 days. Undelivered
          events expire on the device after seven days. After an analytics deletion,
          a credential hash may remain until the enrollment expires, only to prevent
          old uploads from restoring deleted events. Hosting and security logs have
          their own provider retention rules and are not part of the product funnel.
        </p>
      </Section>

      <Section title="8. Account & Data Deletion">
        <p>
          You can delete your account from Data &amp; Privacy in Settings. This
          removes account-linked data and clears local app data. In releases with
          optional usage analytics, reset or account deletion also requests deletion
          of analytics from the installation making that request. Because analytics
          is not linked to an account, we cannot use account deletion to find its
          records on your other devices. Turn off sharing on each device to request
          their deletion too. If the app cannot reconnect, server retention still
          limits how long those records remain.
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
          We respond within 30 days. You can also withdraw your consent to email
          updates at any time in the app's account settings. This applies to all
          users regardless of location (GDPR, CCPA, and equivalent regulations).
        </p>
      </Section>

      <Section title="11. Data Security">
        <p>
          Data is transmitted over HTTPS and stored in Supabase's secured
          infrastructure. Authentication uses Sign in with Apple or Sign in with
          Google, depending on the provider you choose.
        </p>
      </Section>

      <Section title="12. International Data Transfers">
        <p>
          MinuteBank is operated from the United States, and several of the
          third-party services we rely on, including Supabase and Sentry :
          process and store data on servers in the United States. If you use
          the app from the European Economic Area, the United Kingdom, or
          Switzerland, your personal data is transferred outside your home
          region. We rely on appropriate safeguards for these transfers, such
          as the European Commission's Standard Contractual Clauses and, where
          a provider is certified, the EU–U.S. Data Privacy Framework.
        </p>
      </Section>

      <Section title="13. Changes to This Policy">
        <p>
          We may update this policy. Changes will be posted on this page with an
          updated effective date.
        </p>
      </Section>

      <Section title="14. Contact">
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
