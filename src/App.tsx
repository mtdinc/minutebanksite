// Root component. Sets up React Router with three routes:
// /         -> marketing landing page
// /privacy  -> full privacy policy
// /terms    -> full terms of service
// *         -> redirect unknown paths to /

import { Routes, Route, Navigate } from 'react-router';
import { BetaModalProvider } from './components/BetaModalContext';
import BetaSignupModal from './components/BetaSignupModal';
import ScrollToTop from './components/ScrollToTop';
import LandingPage from './components/LandingPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsOfServicePage from './components/TermsOfServicePage';
import JoinGroupPage from './components/JoinGroupPage';
import HelpPage from './components/HelpPage';

export default function App() {
  return (
    <BetaModalProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/join/:code" element={<JoinGroupPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <BetaSignupModal />
    </BetaModalProvider>
  );
}
