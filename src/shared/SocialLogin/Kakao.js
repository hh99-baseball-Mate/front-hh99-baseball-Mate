// const REST_API_KEY = "adeabe34386650e24339f52721b118e5"
const REST_API_KEY = process.env.REACT_APP_KAKAO_API
const REDIRECT_URI = "http://meetball.shop/user/kakao/callback"

export const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`

// export const kakaoUrl =
//   "https://kauth.kakao.com/oauth/authorize?client_id=b631c07985004c604dbf87eed681b185&redirect_uri=http://52.78.93.38/user/kakao/callback&response_type=code"
