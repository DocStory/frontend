import { GlobalStyle } from "./styles/GlobalStyle.ts";
import LandingPage from './components/common/LandingPage';
import RepoTreePage from './components/pages/RepoTreePage';
import PhysicsGraphTestPage from './components/pages/PhysicsGraphTestPage';
import RepositoryHistoryPage from './components/pages/RepositoryHistoryPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/repo-tree" element={<RepoTreePage />} />
          <Route path="/physics-test" element={<PhysicsGraphTestPage />} />
          <Route path="/repository-history" element={<RepositoryHistoryPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
