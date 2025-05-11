import React from 'react';
import { GlobalStyle } from "./styles/GlobalStyle.ts";
import LandingPage from './components/common/LandingPage';
import RepoTreePage from './components/pages/RepoTreePage';
import PhysicsGraphTestPage from './components/pages/PhysicsGraphTestPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage.tsx';
import AppLayout from './components/layout/AppLayout';
import RepositorySection from './components/common/RepositorySection';
import NewRepositorySection from './components/common/NewRepositorySection';

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<AppLayout />}>
            <Route index element={<HomePage />} />
          </Route>
          <Route path="/repository" element={<AppLayout />}>
            <Route index element={<RepositorySection />} />
          </Route>
          <Route path="/new-repository" element={<AppLayout />}>
            <Route index element={<NewRepositorySection />} />
          </Route>
          <Route path="/repo-tree" element={<RepoTreePage />} />
          <Route path="/physics-test" element={<PhysicsGraphTestPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
