import './css/main.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import MainPage from './page/main-page';
import LoginPage from './page/login-page';
import { useContext } from 'react';
import { AuthContext } from './store/AuthProvider';
import MainLoader from './components/loader/main-loader';
import DictionaryPage from './page/dictionary-page';

function App() {
  const auth = useContext(AuthContext);
  if (auth.isLoading) {
    return (
      <MainLoader />
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dictionary" element={<DictionaryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
