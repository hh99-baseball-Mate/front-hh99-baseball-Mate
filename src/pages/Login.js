import React, { useState } from "react"
import { RiKakaoTalkFill } from "react-icons/ri"
import { SiNaver } from "react-icons/si"
import { history } from "../redux/configStore"
import { Inputs } from "../elements/Inputs"
import { Buttons } from "../elements/Buttons"
import { Text } from "../elements/Text"
import { useDispatch } from "react-redux"
import { actionCreators as userActions } from "../redux/modules/user"
import { kakaoUrl } from "../shared/SocialLogin/Kakao"

export const Login = (props) => {
  const [userid, setUserId] = useState("")
  const [password, setPassword] = useState("")
  const [timeline, setTimeline] = useState("")

  const dispatch = useDispatch()

  return (
    <>
      {/* 헤더 */}
      <div>
        <div
          style={{
            width: "278px",
            height: "58px",
            margin: "132px auto",
            fontSize: "37px",
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          야구메이트
        </div>
      </div>

      {/* 로그인 인풋창 / 버튼 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "90%",
          maxWidth: "335px",
          margin: "0 auto",
        }}
      >
        <Text>이메일</Text>
        <Inputs
          type="text"
          placeholder="아이디를 입력해주세요"
          value={userid}
          _onChange={(e) => {
            setUserId(e.target.value)
          }}
        />
        <Text>비밀번호</Text>
        <Inputs
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          _onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
        <Buttons
          margin="24px 0 7px 0"
          bg="#F25343"
          border="1px solid #F25343"
          _onClick={() => {
            // history.push("/clubchoice")
            dispatch(
              userActions.log_in_md({
                userid,
                password,
              })
            )
          }}
        >
          <Text color="#fff" bold>
            로그인
          </Text>
        </Buttons>
        <Buttons
          border="1px solid #EC5E4F"
          bg="#FFFFFF"
          _onClick={() => history.push("/signup")}
        >
          <Text color="#F25343" bold>
            회원가입
          </Text>
        </Buttons>

        <Buttons bg="#4DBF39" _onClick={() => history.push("/signup")}>
          <Text color="#fff" bold>
            네이버 로그인
          </Text>
        </Buttons>
        <Buttons
          bg="#FAE100"
          _onClick={() => {
            console.log("됨?")
            window.location.href = kakaoUrl
          }}
        >
          <Text color="#3C1D1E" bold>
            카카오 로그인
          </Text>
        </Buttons>
        <Buttons bg="#1877F2" _onClick={() => history.push("/signup")}>
          <Text color="#fff" bold>
            페이스북 로그인
          </Text>
        </Buttons>

        {/* 임시 */}
        {/* <Inputs
          type="password"
          placeholder="타임라인내용 입력해주세요"
          value={timeline}
          _onChange={(e) => {
            setTimeline(e.target.value)
          }}
        /> */}
        {/* <Buttons
          margin="30px 0"
          _onClick={() =>
            dispatch(userActions.timeLine(timeline))
          }
        >
          로그인
        </Buttons> */}
      </div>

      <button style={{ width: "40px", height: "40px" }} onClick={() => {}}>
        구단선택
      </button>
    </>
  )
}

// const Hr = styled.hr`
//   display: flex;
//   margin: 30px auto 30px 10px;
//   width: 35%;
// `
