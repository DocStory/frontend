import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AuthService from '../../api/auth';

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(180deg, #F7FAFF 0%, #E3EDFF 100%);
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #6C9EFF;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  font-family: 'Pretendard', 'Inter', sans-serif;
  font-size: 16px;
  color: #333;
  font-weight: 500;
`;

const ErrorText = styled.p`
  font-family: 'Pretendard', 'Inter', sans-serif;
  font-size: 16px;
  color: #e74c3c;
  font-weight: 500;
  margin-top: 20px;
`;

const LoginCallback: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processLogin = async () => {
      try {
        // URL에서 토큰 추출
        const token = AuthService.getTokenFromUrl();
        
        if (token) {
          // 토큰을 로컬 스토리지에 저장
          AuthService.saveToken(token);
          
          // 인증 확인 테스트
          const isAuthenticated = await AuthService.isAuthenticated();
          
          if (isAuthenticated) {
            // 인증되었으면 홈으로 이동
            navigate('/home');
          } else {
            // 토큰은 있지만 유효하지 않은 경우
            setError('인증에 실패했습니다. 유효하지 않은 토큰입니다.');
            // 토큰 제거
            localStorage.removeItem('accessToken');
            setTimeout(() => {
              navigate('/');
            }, 2000);
          }
        } else {
          // 토큰이 없는 경우
          setError('로그인에 실패했습니다. 토큰이 없습니다.');
          setTimeout(() => {
            navigate('/');
          }, 2000);
        }
      } catch (err) {
        // 오류 발생 시 처리
        setError('로그인 중 오류가 발생했습니다.');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    };

    processLogin();
  }, [navigate]);

  return (
    <LoadingContainer>
      <Spinner />
      <LoadingText>로그인 중입니다...</LoadingText>
      {error && <ErrorText>{error}</ErrorText>}
    </LoadingContainer>
  );
};

export default LoginCallback; 