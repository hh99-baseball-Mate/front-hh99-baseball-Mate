import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router";

import home from "../shared/icon/navbar/home.png";
import home_select from "../shared/icon/navbar/home_select.png";
import sch from "../shared/icon/navbar/sch.png";
import sch_select from "../shared/icon/navbar/sch_select.png";
import rec from "../shared/icon/navbar/rec.png";
import rec_select from "../shared/icon/navbar/rec_select.png";
import my from "../shared/icon/navbar/my.png";
import my_select from "../shared/icon/navbar/my_select.png";
import { useSelector } from "react-redux";

const NaviBar = (props) => {
  const user_info = useSelector((state) => state.user.user_info);

  const { useridx } = user_info;

  const history = useHistory();

  return (
    <Container>
      <Warp justify="space-between">
        {/* 메인 */}
        <Icon
          onClick={() => {
            history.push("/");
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
          onClick={() => {
            history.push("/mygroup");
          }}
        >
          {props.sch ? (
            <img src={sch_select} alt="sch_col" />
          ) : (
            <img src={sch} alt="sch" />
          )}
        </Icon>

        {/* 활동 */}
        <Icon
          onClick={() => {
            history.push("/alarm");
          }}
        >
          {props.rec ? (
            <img src={rec_select} alt="rec_col" />
          ) : (
            <img src={rec} alt="rec" />
          )}
        </Icon>

        {/* 마이페이지 */}
        <Icon
          onClick={() => {
            history.push(`/mypage/${useridx}`);
          }}
        >
          {props.my ? (
            <img src={my_select} alt="my_col" />
          ) : (
            <img src={my} alt="my" />
          )}
        </Icon>
      </Warp>
    </Container>
  );
};

export default NaviBar;

const Container = styled.div`
  background: #fff;
  width: 376px;
  height: 94px;
  border-top: 1px solid #e7e7e7;
  padding: 15px 28px 38px 35px;
  position: fixed;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
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
