import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DirectoryPage from './pages/DirectoryPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/directory" element={<DirectoryPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}

export default App;