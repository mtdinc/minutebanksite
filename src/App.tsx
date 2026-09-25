// Root component. Sets up React Router with these routes:
// /            -> marketing landing page
// /privacy     -> full privacy policy
// /terms       -> full terms of service
// /help        -> help center
// /join/:code  -> group invite fallback when the app is not installed
// *            -> redirect unknown paths to /

import { Routes, Route, Navigate } from 'react-router';
import ScrollToTop from './components/ScrollToTop';
import LandingPage from './components/LandingPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsOfServicePage from './components/TermsOfServicePage';
import JoinGroupPage from './components/JoinGroupPage';
import HelpPage from './components/HelpPage';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/join/:code" element={<JoinGroupPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
