// 이메일 혇식

export const regEmail =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i

// 패스워드 8~16 글자 영문 숫자 특수문자 포함
export const regPassword =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/

// 핸드폰 숫자만 입력받기
export const regPhone = /[0-9]/
