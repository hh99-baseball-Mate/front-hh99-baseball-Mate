const REST_API_KEY = process.env.REACT_APP_KAKAO_API

// 로컬 전용
// const REDIRECT_URI = "http://localhost:3000/user/kakao/callback"

// 배포전용
const REDIRECT_URI = "http://meetball.shop/user/kakao/callback"

export const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`
