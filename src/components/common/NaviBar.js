import React, { memo } from "react"
import styled from "styled-components"
import { useSelector } from "react-redux"
import { PancilBtn } from "../element/index"

import home from "../../shared/icon/navbar/home.svg"
import home_select from "../../shared/icon/navbar/home_select.svg"
import sch from "../../shared/icon/navbar/sch.svg"
import sch_select from "../../shared/icon/navbar/sch_select.svg"
import chat from "../../shared/icon/navbar/chat.svg"
import chat_select from "../../shared/icon/navbar/chat_select.svg"
import my from "../../shared/icon/navbar/my.svg"
import my_select from "../../shared/icon/navbar/my_select.svg"
import { history } from "../../redux/configStore"
import { useLoginCheck } from "../customHook/useLoginCheck"

export const NaviBar = memo((props) => {
  // 하단 네비바
  const user_info = useSelector((state) => state.user.user_info)
  const is_login = useSelector((state) => state.user.is_login)

  const { useridx } = user_info

  // 로그인 유무로 보낼 사이트 경로 설정 커스텀훅
  const [pathHandle] = useLoginCheck()

  return (
    <Container writeBtn={props.writeBtn}>
      <Warp justify="space-between">
        {/* 메인 */}
        <Icon onClick={() => history.push("/")}>
          {props.home ? (
            <img src={home_select} alt="home_col" />
          ) : (
            <img src={home} alt="home" />
          )}
        </Icon>

        {/* 내 모임 */}
        <Icon onClick={() => pathHandle("login", "mygroup")}>
          {props.sch ? (
            <img src={sch_select} alt="sch_col" />
          ) : (
            <img src={sch} alt="sch" />
          )}
        </Icon>

        {/* 채팅 */}
        <Icon onClick={() => pathHandle("login", "chatlist")}>
          {props.chat ? (
            <img src={chat_select} alt="rec_col" />
          ) : (
            <img src={chat} alt="rec" />
          )}
        </Icon>

        {/* 마이페이지 */}
        <Icon
          onClick={() => {
            history.push(`/mypage/${useridx ? useridx : "userid"}`)
          }}
        >
          {props.my ? (
            <img src={my_select} alt="my_col" />
          ) : (
            <img src={my} alt="my" />
          )}
        </Icon>
      </Warp>
      {is_login && props.writeBtn ? (
        <PancilBtn onClick={props.onClick} />
      ) : null}
    </Container>
  )
})

NaviBar.defaultProps = {
  writeBtn: false,
}

const Container = styled.div`
  background: #fff;
  width: 100%;
  max-width: 425px;
  height: 64px;
  border-top: 1px solid #e7e7e7;
  padding: 10px 30px 15px 30px;
  position: fixed;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  /* box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2); */
`

const Warp = styled.div`
  display: flex;
  width: ${(props) => props.width};
  flex-direction: ${(props) => props.direction};
  flex-wrap: ${(props) => props.wrap};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  align-content: ${(props) => props.start};
  margin-left: ${(props) => props.marginLeft};
  margin-bottom: ${(props) => props.bottom};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  position: ${(props) => props.position};
`

const Icon = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
`
