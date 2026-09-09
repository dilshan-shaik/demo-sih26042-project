import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './components/common/Toast';
import { AppLayout } from './components/layout/AppLayout';

// Pages
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { VoiceTranslatorPage } from './pages/VoiceTranslatorPage';
import { TextTranslatorPage } from './pages/TextTranslatorPage';
import { LessonsPage } from './pages/LessonsPage';
import { WorksheetsPage } from './pages/WorksheetsPage';
import { FlashcardsPage } from './pages/FlashcardsPage';
import { ValidationPage } from './pages/ValidationPage';
import { SettingsPage } from './pages/SettingsPage';

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Authenticated / App Shell Layout */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/voice-translator" element={<VoiceTranslatorPage />} />
            <Route path="/text-translator" element={<TextTranslatorPage />} />
            <Route path="/lessons" element={<LessonsPage />} />
            <Route path="/worksheets" element={<WorksheetsPage />} />
            <Route path="/flashcards" element={<FlashcardsPage />} />
            <Route path="/validation" element={<ValidationPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/app" element={<Navigate to="/dashboard" replace />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}
