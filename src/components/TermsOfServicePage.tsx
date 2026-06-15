// Full terms of service for App Store submission.
// Includes all 10 Apple mandatory EULA clauses + developer protections.
// Accessible at minutebank.app/terms

import { Link } from 'react-router';
import LegalPageLayout from './LegalPageLayout';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article>
      <h2 className="font-medium text-[#1a1a1a] text-[18px] lg:text-[20px] mb-3">{title}</h2>
      {children}
    </article>
  );
}

export default function TermsOfServicePage() {
  return (
    <LegalPageLayout title="Terms of Service" lastUpdated="March 15, 2026">

      <Section title="1. Acceptance of Terms">
        <p>
          Welcome to MinuteBank ("we," "us," or "our"). These Terms of Service
          govern your access to and use of the MinuteBank app. This agreement is
          between you and us only, and not with Apple Inc. We, not Apple, are solely
          responsible for MinuteBank and its content. By using MinuteBank, you agree
          to be bound by these Terms. If you don't agree, don't use the app. The
          developer's identity and contact information are provided in Section 30.
        </p>
      </Section>

      <Section title="2. Description of Service">
        <p>
          MinuteBank is a focus timer app that rewards study sessions with in-app
          currency. Features include app blocking (via Screen Time), goals, social
          leaderboards, and an Apple Watch companion. The app requires iOS 17 or later.
        </p>
      </Section>

      <Section title="3. Account Registration">
        <p>
          You may create an account using Sign In with Apple. You are responsible for
          maintaining the security of your account. One account per person.
        </p>
      </Section>

      <Section title="4. In-App Purchases">
        <p>
          MinuteBank offers optional Pro subscriptions (monthly, yearly) and a lifetime
          purchase. All purchases are processed by Apple and subject to Apple's terms.
          Subscription management and cancellation are handled through your Apple ID settings.
        </p>
      </Section>

      <Section title="5. Maintenance and Support">
        <p>
          We are solely responsible for any maintenance and support for the app,
          as specified in these Terms or as required under applicable law. Apple has no
          obligation whatsoever to furnish any maintenance or support services with respect
          to the app. Contact{' '}
          <a href="mailto:support@minutebank.app" className="text-[#e87a55] hover:underline">
            support@minutebank.app
          </a>{' '}
          or call (617) 250-7663 for help.
        </p>
      </Section>

      <Section title="6. Screen Time & App Blocking Disclaimer">
        <p className="mb-3">
          MinuteBank uses Apple's FamilyControls, Screen Time, and ManagedSettings APIs
          to block apps at your request. You acknowledge and agree that:
        </p>
        <ol className="list-[lower-alpha] pl-6 space-y-2">
          <li>App blocking functionality depends on iOS system capabilities and permissions that may change without notice;</li>
          <li>We do not guarantee that app blocking will work at all times or prevent all access to blocked apps;</li>
          <li>You are solely responsible for any consequences of apps being blocked or not blocked, including missed notifications, alarms, calls, or messages from blocked apps;</li>
          <li>We are not liable for any loss, injury, or damage arising from the app blocking feature, including but not limited to missed emergency communications; and</li>
          <li>The app blocking feature is a productivity tool and is not intended as a parental control, addiction treatment, or medical device.</li>
        </ol>
      </Section>

      <Section title="7. No Professional Advice">
        <p>
          MinuteBank is a productivity and digital wellness tool. It does not provide and
          is not a substitute for professional medical, psychological, educational, or
          therapeutic advice, diagnosis, or treatment. If you have concerns about screen time,
          focus, attention, or digital habits, consult a qualified healthcare professional.
          MinuteBank is not a medical device and has not been evaluated by any regulatory body.
        </p>
      </Section>

      <Section title="8. Acceptable Use">
        <p>
          You agree not to: reverse-engineer the app, use it to harass others, create
          multiple accounts, or interfere with the service.
        </p>
      </Section>

      <Section title="9. Intellectual Property">
        <p>
          MinuteBank, its design, and content are owned by us. You receive a
          limited, non-transferable, revocable license to use the app on Apple-branded
          devices you own or control, subject to the Usage Rules in the Apple Media Services
          Terms and Conditions.
        </p>
      </Section>

      <Section title="10. WARRANTY DISCLAIMER">
        <p className="uppercase text-[13px] leading-[1.9]">
          THE APP IS PROVIDED "AS IS" AND "AS AVAILABLE," WITH ALL FAULTS AND WITHOUT
          WARRANTY OF ANY KIND. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW,
          WE HEREBY DISCLAIM ALL WARRANTIES AND CONDITIONS WITH RESPECT TO
          THE APP, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING BUT NOT LIMITED TO
          THE IMPLIED WARRANTIES AND CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
          PURPOSE, ACCURACY, QUIET ENJOYMENT, AND NON-INFRINGEMENT OF THIRD-PARTY RIGHTS.
          NO ORAL OR WRITTEN INFORMATION OR ADVICE GIVEN BY US SHALL CREATE A
          WARRANTY. WE DO NOT WARRANT THAT THE APP WILL MEET YOUR REQUIREMENTS,
          THAT THE OPERATION OF THE APP WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE,
          THAT DEFECTS WILL BE CORRECTED, OR THAT THE APP IS FREE OF VIRUSES OR OTHER HARMFUL
          COMPONENTS. SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF IMPLIED WARRANTIES,
          SO SOME OF THE ABOVE EXCLUSIONS MAY NOT APPLY TO YOU.
        </p>
      </Section>

      <Section title="11. Apple Warranty Provision">
        <p>
          In the event of any failure of MinuteBank to conform to any applicable warranty,
          you may notify Apple, and Apple will refund the purchase price for the app to you.
          To the maximum extent permitted by applicable law, Apple has no other warranty
          obligation whatsoever with respect to the app, and any other claims, losses,
          liabilities, damages, costs, or expenses attributable to any failure to conform
          to any warranty are our sole responsibility.
        </p>
      </Section>

      <Section title="12. LIMITATION OF LIABILITY">
        <p className="uppercase text-[13px] leading-[1.9]">
          TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL WE
          BE LIABLE FOR PERSONAL INJURY OR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL,
          EXEMPLARY, OR PUNITIVE DAMAGES WHATSOEVER, INCLUDING BUT NOT LIMITED TO DAMAGES
          FOR LOSS OF PROFITS, LOSS OF DATA, LOSS OF GOODWILL, BUSINESS INTERRUPTION,
          DEVICE DAMAGE, OR ANY OTHER COMMERCIAL OR PERSONAL DAMAGES OR LOSSES, ARISING
          OUT OF OR RELATED TO YOUR USE OF OR INABILITY TO USE THE APP, HOWEVER CAUSED,
          REGARDLESS OF THE THEORY OF LIABILITY (WHETHER IN CONTRACT, TORT, STRICT LIABILITY,
          OR OTHERWISE) AND EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF
          SUCH DAMAGES. OUR TOTAL AGGREGATE LIABILITY FOR ALL CLAIMS ARISING
          OUT OF OR RELATING TO THESE TERMS OR THE APP SHALL NOT EXCEED THE GREATER OF
          (A) THE AMOUNTS YOU ACTUALLY PAID TO US FOR THE APP IN THE TWELVE (12)
          MONTHS PRECEDING THE CLAIM, OR (B) FIFTY U.S. DOLLARS ($50.00). THE FOREGOING
          LIMITATIONS SHALL APPLY EVEN IF A REMEDY SET FORTH HEREIN IS FOUND TO HAVE FAILED
          OF ITS ESSENTIAL PURPOSE. SOME JURISDICTIONS DO NOT ALLOW THE LIMITATION OF
          LIABILITY FOR PERSONAL INJURY OR INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THESE
          LIMITATIONS MAY NOT APPLY TO YOU.
        </p>
      </Section>

      <Section title="13. Assumption of Risk">
        <p>
          You expressly acknowledge and agree that your use of MinuteBank is at your sole
          risk. You voluntarily assume all risks associated with using the app, including
          but not limited to risks related to app blocking, timer functionality, data loss,
          and interaction with Apple's Screen Time system.
        </p>
      </Section>

      <Section title="14. Indemnification">
        <p>
          You agree to indemnify, defend, and hold harmless us from and against
          any and all claims, damages, obligations, losses, liabilities, costs, and expenses
          (including but not limited to reasonable attorney's fees) arising from: (i) your
          use of or access to the app; (ii) your violation of these Terms; (iii) your
          violation of any third-party right, including without limitation any intellectual
          property right or privacy right; or (iv) any claim that your use of the app caused
          damage to a third party. This indemnification obligation will survive the
          termination of these Terms and your use of the app.
        </p>
      </Section>

      <Section title="15. Modification and Discontinuation">
        <p>
          We reserve the right to modify, suspend, or discontinue the app (or any
          part of it) at any time, with or without notice, and without liability to you.
          There is no obligation to provide updates, enhancements, or continued availability
          of the service.
        </p>
      </Section>

      <Section title="16. Product Claims">
        <p>
          We, not Apple, are responsible for addressing any claims relating to the
          app, including product liability claims, any claim that the app fails to conform
          to any applicable legal or regulatory requirement, and claims arising under consumer
          protection, privacy, or similar legislation.
        </p>
      </Section>

      <Section title="17. Intellectual Property Claims">
        <p>
          We, not Apple, are responsible for the investigation, defense, settlement,
          and discharge of any third-party intellectual property infringement claim related
          to the app.
        </p>
      </Section>

      <Section title="18. Legal Compliance">
        <p>
          You represent and warrant that (i) you are not located in a country that is subject
          to a U.S. Government embargo, or that has been designated by the U.S. Government
          as a "terrorist supporting" country; and (ii) you are not listed on any U.S.
          Government list of prohibited or restricted parties.
        </p>
      </Section>

      <Section title="19. Third-Party Terms">
        <p>
          You must comply with applicable third-party terms when using the app (e.g., your
          wireless carrier's data agreement, Apple Media Services Terms and Conditions).
        </p>
      </Section>

      <Section title="20. Apple as Third-Party Beneficiary">
        <p>
          You acknowledge and agree that Apple, and Apple's subsidiaries, are third-party
          beneficiaries of these Terms. Upon your acceptance of these Terms, Apple has the
          right to enforce these Terms against you as a third-party beneficiary.
        </p>
      </Section>

      <Section title="21. DISPUTE RESOLUTION BY BINDING ARBITRATION; CLASS ACTION WAIVER">
        <p className="mb-3">
          Any dispute, claim, or controversy arising out of or relating to these Terms or
          the use of MinuteBank shall be resolved by binding arbitration administered by
          the American Arbitration Association (AAA) under its Consumer Arbitration Rules.
          The arbitration shall be conducted in New York. Each party shall bear its own
          costs and expenses.
        </p>
        <p className="uppercase text-[13px] leading-[1.9] mb-3">
          YOU AND WE EACH WAIVE THE RIGHT TO A TRIAL BY JURY AND THE RIGHT TO
          PARTICIPATE IN A CLASS ACTION, COLLECTIVE ACTION, OR REPRESENTATIVE PROCEEDING.
        </p>
        <p>
          The arbitrator may award relief only in favor of the individual party seeking
          relief and only to the extent necessary to provide relief warranted by that
          party's individual claim. If any part of this arbitration agreement is found
          unenforceable, the remainder shall still apply; however, if the class action
          waiver is found unenforceable, the entire arbitration agreement shall be void.
          This arbitration agreement shall survive termination of these Terms.
        </p>
      </Section>

      <Section title="22. Account Termination">
        <p>
          You can delete your account at any time from within the app. We may,
          in its sole discretion, suspend, restrict, or terminate your account and access
          to the app at any time, for any reason or for no reason, with or without notice,
          and without liability to you. Upon termination, your license to use the app
          terminates immediately.
        </p>
      </Section>

      <Section title="23. Changes to These Terms">
        <p>
          We reserve the right to modify these Terms at any time. If we make
          material changes, we will update the "Last Updated" date at the top of these
          Terms. Your continued use of MinuteBank after any such changes constitutes your
          binding acceptance of the updated Terms. If you do not agree to the updated Terms,
          your sole remedy is to stop using the app and delete your account.
        </p>
      </Section>

      <Section title="24. Force Majeure">
        <p>
          We shall not be liable for any delay or failure to perform any obligation
          under these Terms where the delay or failure results from any cause beyond reasonable
          control, including but not limited to acts of God, natural disasters, pandemic, war,
          terrorism, government actions, power failure, internet or telecommunications failure,
          Apple platform changes, or third-party service outages (including Supabase).
        </p>
      </Section>

      <Section title="25. Entire Agreement">
        <p>
          These Terms, together with the{' '}
          <Link to="/privacy" className="text-[#e87a55] hover:underline">Privacy Policy</Link>,
          constitute the entire agreement between you and us regarding your use
          of MinuteBank and supersede all prior agreements, representations, and understandings.
        </p>
      </Section>

      <Section title="26. Severability">
        <p>
          If any provision of these Terms is found by a court or arbitrator of competent
          jurisdiction to be invalid, illegal, or unenforceable, that provision shall be
          enforced to the maximum extent permissible, and the remaining provisions shall
          remain in full force and effect.
        </p>
      </Section>

      <Section title="27. No Waiver">
        <p>
          Our failure to enforce any right or provision of these Terms shall
          not be considered a waiver of that right or provision. The waiver of any such right
          or provision will be effective only if in writing.
        </p>
      </Section>

      <Section title="28. Survival">
        <p>
          The following sections shall survive termination or expiration of these Terms:
          Warranty Disclaimer, Apple Warranty Provision, Limitation of Liability, Assumption
          of Risk, Indemnification, Dispute Resolution, Governing Law, and any other
          provisions that by their nature should survive.
        </p>
      </Section>

      <Section title="29. Governing Law and Jurisdiction">
        <p>
          These Terms shall be governed by and construed in accordance with the laws of the
          State of New York, USA, without regard to its conflict of law provisions. Subject
          to the arbitration agreement above, any legal action or proceeding arising out of
          or relating to these Terms shall be brought exclusively in the state or federal
          courts located in New York, and you consent to the personal jurisdiction and venue
          of such courts.
        </p>
      </Section>

      <Section title="30. Contact">
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
