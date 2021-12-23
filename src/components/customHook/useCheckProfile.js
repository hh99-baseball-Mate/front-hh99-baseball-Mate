// 게시글에 등록된 사람의 프로필 사진 체크

export const useCheckProfile = (UserImage) => {

	const checkProfile = () => {


		// 카카오 프로필 사진인지 확인
		const kakaoCheck = UserImage?.split(".")[1]


		if (kakaoCheck === "kakaocdn") {
			return UserImage
		} else {
			return process.env.REACT_APP_S3_USER_PROFILE_URL + UserImage
		}

	}
	return [checkProfile]
}