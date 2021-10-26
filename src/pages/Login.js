import React, { useState } from "react"
import Image from "react-bootstrap/Image"
import { RiKakaoTalkFill } from "react-icons/ri"
import { SiNaver } from "react-icons/si"
import { history } from "../redux/configStore"
import { Inputs } from "../elements/Inputs"
import { Buttons } from "../elements/Buttons"

export const Login = (props) => {
  const [user_id, setId] = useState("")
  const [password, setPassword] = useState("")

  return (
    <>
      {/* // 로고 */}
      <div style={{ display: "flex" }}>
        <Image
          src="https://thumb.mt.co.kr/06/2019/03/2019032112013309513_1.jpg"
          roundedCircle
          style={{ maxWidth: "300px", margin: "5% auto" }}
        />
      </div>

      {/* 로그인 인풋창 / 버튼 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
          maxWidth: "450px",
          margin: "0 auto",
        }}
      >
        <Inputs
          type="text"
          placeholder="아이디를 입력해주세요"
          value={user_id}
          _onChange={(e) => {
            setId(e.target.value)
          }}
        />
        <Inputs
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          _onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
        <Buttons
          margin="30px 0"
          _onClick={() => [console.log(user_id, password)]}
        >
          로그인
        </Buttons>
      </div>

      {/* 절취선 */}
      <div
        style={{
          display: "flex",
          maxWidth: "450px",
          margin: "0 auto",
        }}
      >
        <hr
          style={{
            display: "flex",
            margin: "30px 10px 30px auto",
            width: "35%",
          }}
        ></hr>
        <div style={{ paddingTop: "20px" }}>또는</div>
        <hr
          style={{
            display: "flex",
            margin: "30px auto 30px 10px",
            width: "35%",
          }}
        ></hr>
      </div>

      {/* 소셜 로그인 */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <RiKakaoTalkFill
          size="40px"
          style={{
            borderRadius: "50%",
            backgroundColor: "yellow",
            // marginRight: "30px",
          }}
        />
        <SiNaver
          size="40px"
          color="green"
          style={{ borderRadius: "50%", margin: "0px 20px" }}
        />
        <button
          style={{ width: "40px", height: "40px" }}
          onClick={() => {
            history.push("/signup")
          }}
        >
          가입
        </button>
        <button
          style={{ width: "40px", height: "40px" }}
          onClick={() => {
            history.push("/clubchoice")
          }}
        >
          구단선택
        </button>
      </div>
    </>
  )
}

// const Hr = styled.hr`
//   display: flex;
//   margin: 30px auto 30px 10px;
//   width: 35%;
// `
