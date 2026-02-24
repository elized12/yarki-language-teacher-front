import './css/main.css';

import { BrowserRouter, Routes, Route } from 'react-router';
import MainPage from './page/main-page';
import LoginPage from './page/login-page';
import DictionaryPage from './page/dictionary-page';
import TranslatePage from './page/translate-page';
import TrainSettingsPage from './page/train-settings-page';
import TrainingPage from './page/training-page';
import RegisterPage from './page/register-page';
import RequireAuthRoute from './components/route/require-auth-router';
import GuestOnlyRouter from './components/route/guest-only-router';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <RequireAuthRoute>
            <MainPage />
          </RequireAuthRoute>} />
        <Route path="/dictionary" element={
          <RequireAuthRoute>
            <DictionaryPage />
          </RequireAuthRoute>} />
        <Route path="/translate" element={
          <RequireAuthRoute>
            <TranslatePage />
          </RequireAuthRoute>} />
        <Route path="/train/settings" element={
          <RequireAuthRoute>
            <TrainSettingsPage />
          </RequireAuthRoute>} />
        <Route path="/train/:sessionId" element={
          <RequireAuthRoute>
            <TrainingPage />
          </RequireAuthRoute>} />
        <Route path="/register" element={
          <GuestOnlyRouter>
            <RegisterPage />
          </GuestOnlyRouter>} />
        <Route path="/login" element={
          <GuestOnlyRouter>
            <LoginPage />
          </GuestOnlyRouter>} />
        <Route path="*" element={
          <RequireAuthRoute>
            <MainPage />
          </RequireAuthRoute>} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
