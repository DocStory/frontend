import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // 기본 URL을 프록시 사용을 위해 상대 경로로 변경
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 쿠키를 요청과 함께 전송
});

// 요청 인터셉터 추가
api.interceptors.request.use(
  (config) => {
    // localStorage에서 액세스 토큰 가져오기
    const token = localStorage.getItem('accessToken');
    
    // 토큰이 있는 경우 요청 헤더에 추가
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 Unauthorized 에러 처리
    if (error.response?.status === 401) {
      // 토큰 제거
      localStorage.removeItem('accessToken');
      // 현재 경로가 '/'가 아닌 경우에만 리다이렉트
      if (window.location.pathname !== '/') {
        // pushState를 사용하여 히스토리 추가
        window.history.pushState({}, '', '/');
        // 페이지 새로고침 없이 상태 변경 이벤트 발생
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    }
    return Promise.reject(error);
  }
);

export default api;
