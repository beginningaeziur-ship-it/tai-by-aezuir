import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import { EmotionalStateProvider } from './contexts/EmotionalStateContext';
import { MicrophoneProvider } from './contexts/MicrophoneContext';
import { VoiceSettingsProvider } from './contexts/VoiceSettingsContext';
import { SAIProvider } from './contexts/SAIContext';
import { OfflineStatusBanner } from './components/ui/OfflineStatusBanner';
import Index from './pages/Index';
import WaitingRoom from './pages/onboarding/WaitingRoom';
import SecurityBriefing from './pages/onboarding/SecurityBriefing';
import Assessment from './pages/onboarding/Assessment';
import SafetyPlan from './pages/onboarding/SafetyPlan';
import OfficeExit from './pages/onboarding/OfficeExit';
import HomeEntrance from './pages/onboarding/HomeEntrance';
import SAIHome from './pages/SAIHome';
import BeachScene from './pages/BeachScene';
import ForestScene from './pages/ForestScene';
import Settings from './pages/Settings';
import Watcher from './pages/Watcher';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <AccessibilityProvider>
      <EmotionalStateProvider>
        <MicrophoneProvider>
          <VoiceSettingsProvider>
            <SAIProvider>
              <BrowserRouter>
                <OfflineStatusBanner />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/onboarding/waiting-room" element={<WaitingRoom />} />
                  <Route path="/onboarding/security" element={<SecurityBriefing />} />
                  <Route path="/onboarding/assessment" element={<Assessment />} />
                  <Route path="/onboarding/safety-plan" element={<SafetyPlan />} />
                  <Route path="/onboarding/exit" element={<OfficeExit />} />
                  <Route path="/onboarding/home-entrance" element={<HomeEntrance />} />
                  <Route path="/sai-home" element={<SAIHome />} />
                  <Route path="/beach" element={<BeachScene />} />
                  <Route path="/forest" element={<ForestScene />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/cabin" element={<Navigate to="/settings" replace />} />
                  <Route path="/watcher" element={<Watcher />} />
                  <Route path="/pai" element={<Watcher />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </SAIProvider>
          </VoiceSettingsProvider>
        </MicrophoneProvider>
      </EmotionalStateProvider>
    </AccessibilityProvider>
  );
}
