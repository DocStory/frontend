import api from './axios';

/**
 * 인증 서비스 - 토큰 기반 인증
 */
const AuthService = {
  // 사용자 인증 상태 확인
  isAuthenticated: async (): Promise<boolean> => {
    try {
      // localStorage에서 토큰 확인
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        return false;
      }
      
      // 토큰 유효성 검증을 위한 API 요청
      await api.get('/api/auth/check');
      return true;
    } catch (error) {
      return false;
    }
  },

  // 로그아웃 - 서버에 로그아웃 요청만 수행
  logout: async (): Promise<void> => {
    try {
      await api.post('/api/users/logout');
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
      throw error;
    }
  },

  // 소셜 로그인 URL 생성
  getSocialLoginUrl: (provider: 'google' | 'kakao'): string => {
    return `${import.meta.env.VITE_API_URL}/oauth2/authorization/${provider}`;
  },
  
  // URL에서 토큰 추출
  getTokenFromUrl: (): string | null => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('accessToken');
  },
  
  // 토큰 저장
  saveToken: (token: string): void => {
    localStorage.setItem('accessToken', token);
  },
  
  // 토큰 가져오기
  getToken: (): string | null => {
    return localStorage.getItem('accessToken');
  }
};

export default AuthService; 