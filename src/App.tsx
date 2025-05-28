import React, { useEffect, useState } from 'react';
import { GlobalStyle } from "./styles/GlobalStyle.ts";
import LandingPage from './components/common/LandingPage';
import RepoTreePage from './components/pages/RepoTreePage';
import PhysicsGraphTestPage from './components/pages/PhysicsGraphTestPage';
import RepositoryHistoryPage from './components/pages/RepositoryHistoryPage';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
import HomePage from './components/pages/HomePage.tsx';
import AppLayout from './components/layout/AppLayout';
import RepositorySection from './components/common/RepositorySection';
import NewRepositorySection from './components/common/NewRepositorySection';
import LoginCallback from './components/auth/LoginCallback';
import AuthService from './api/auth';

// URL 파라미터 토큰 처리를 위한 래퍼 컴포넌트
const TokenHandler: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // 현재 URL이 루트 페이지이고 토큰 파라미터가, 포함되어 있다면 처리
    if (location.pathname === '/' && location.search.includes('accessToken')) {
      const token = AuthService.getTokenFromUrl();
      
      if (token) {
        // 토큰 저장
        AuthService.saveToken(token);
        
        // 토큰을 제외한 URL로 리다이렉트
        navigate('/home', { replace: true });
      }
    }
  }, [location, navigate]);
  
  return null;
};

// RepositoryHistoryPage를 위한 래퍼 컴포넌트
const RepositoryHistoryWrapper: React.FC = () => {
  const { repositoryId } = useParams<{ repositoryId: string }>();
  return <RepositoryHistoryPage repositoryId={repositoryId} />;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  // 앱 초기화 시 인증 상태 확인
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuthenticated = await AuthService.isAuthenticated();
        if (isAuthenticated) {
          console.log('사용자가 로그인되어 있습니다.');
        }
      } catch (error) {
        console.error('인증 상태 확인 중 오류 발생:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  // 로딩 중인 경우 빈 화면 표시
  if (isLoading) {
    return <div>로딩 중...</div>;
  }
  
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <TokenHandler />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* 소셜 로그인 콜백 처리를 위한 라우트 추가 */}
          <Route path="/login/callback" element={<LoginCallback />} />
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
          <Route path="/repository/:repositoryId/history" element={<RepositoryHistoryWrapper />} />
          <Route path="/repository-history" element={<RepositoryHistoryPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
