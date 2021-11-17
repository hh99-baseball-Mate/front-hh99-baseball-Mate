import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router";

import home from "../shared/icon/navbar/home.svg";
import home_select from "../shared/icon/navbar/home_select.svg";
import sch from "../shared/icon/navbar/sch.svg";
import sch_select from "../shared/icon/navbar/sch_select.svg";
import chat from "../shared/icon/navbar/chat.svg";
import chat_select from "../shared/icon/navbar/chat_select.svg";
import my from "../shared/icon/navbar/my.svg";
import my_select from "../shared/icon/navbar/my_select.svg";
import { useSelector } from "react-redux";
import { PancilBtn } from "."

const NaviBar = (props) => {
  const user_info = useSelector((state) => state.user.user_info)
  const is_login = useSelector((state) => state.user.is_login)

  const { useridx } = user_info

  const history = useHistory()

  return (
    <Container writeBtn={props.writeBtn}>
      <Warp justify="space-between">
        {/* 메인 */}
        <Icon
          onClick={() => {
            history.push("/")
          }}
        >
          {props.home ? (
            <img src={home_select} alt="home_col" />
          ) : (
            <img src={home} alt="home" />
          )}
        </Icon>

        {/* 내 모임 */}
        <Icon
          onClick={(e) => {
            is_login
              ? history.push("/mygroup")
              : window.alert("로그인 후 이용해주세요")
            e.target.disabled = true
          }}
        >
          {props.sch ? (
            <img src={sch_select} alt="sch_col" />
          ) : (
            <img src={sch} alt="sch" />
          )}
        </Icon>

        {/* 채팅 */}
        <Icon
          onClick={(e) => {
            is_login
              ? history.push("/chat")
              : window.alert("로그인 후 이용해주세요")
            e.target.disabled = true
          }}
        >
          {props.chat ? (
            <img src={chat_select} alt="rec_col" />
          ) : (
            <img src={chat} alt="rec" />
          )}
        </Icon>

        {/* 마이페이지 */}
        <Icon
          onClick={() => {
            history.push(`/mypage/${useridx}`)
          }}
        >
          {props.my ? (
            <img src={my_select} alt="my_col" />
          ) : (
            <img src={my} alt="my" />
          )}
        </Icon>
      </Warp>
      {props.writeBtn ? <PancilBtn onClick={props.onClick} /> : null}
    </Container>
  )
}

export default NaviBar

NaviBar.defaultProps = {
  writeBtn: false,
}

const Container = styled.div`
  background: #fff;
  width: 425px;
  height: 64px;
  border-top: 1px solid #e7e7e7;
  padding: 10px 30px 15px 30px;
  position: fixed;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
`;

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
`;

const Icon = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
`;

const Box = styled.div`
  width: 335px;
  /* height: 177px; */
  margin: 20px auto;
`;

const Text = styled.div`
  font-size: 12px;
  font-weight: normal;
  color: #c4c4c4;
  letter-spacing: -0.01em;
  margin-top: 3.5px;
`;
