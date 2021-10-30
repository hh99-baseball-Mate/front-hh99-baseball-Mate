import React from "react"
import Button from "react-bootstrap/Button"
import { history } from "../redux/configStore"
import { Header } from "../components/Header"
import { useSelector } from "react-redux"
import { ClubImage } from "../componentsLogin/ClubImage"
import { Text } from "../componentsLogin"

export const ClubChoice = (props) => {
  const userNmae = useSelector((state) => state.user.user_info.username)

  console.log(userNmae)

  return (
    <>
      <div
        style={{
          width: "90%",
          maxWidth: "375px",
          margin: "20px auto 0 auto",
        }}
      >
        <Header
          onClick={() => {
            history.push("/login")
          }}
        />
        <div style={{ margin: "32px 16px" }}>
          <div
            style={{
              padding: "36px 50px 50px 0 ",
            }}
          >
            <Text size="18px" bold>
              구단선택
            </Text>
          </div>

          {/* 선택 메세지 로그인 사용자 */}
          <Text size="24px" bold>
            <span style={{ color: "blue" }}>
              {userNmae ? userNmae : "관리자"}
            </span>
            님이 좋아하는 구단을 선택해주세요.
          </Text>
        </div>

        {/* 구단선택 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
            gap: "30px",
          }}
        >
          {/* 클럽 이미지 */}
          <ClubImage />
        </div>
      </div>
    </>
  )
}
