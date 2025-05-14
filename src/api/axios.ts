import axios from "axios";

const api = axios.create({
  baseURL: "/", // 기본 URL을 프록시 사용을 위해 상대 경로로 변경
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

export default api;
