import React, { useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { VscBell } from "react-icons/vsc";
import bell from "../shared/icon/bell.svg";
import { useDispatch, useSelector } from "react-redux";
import { alarmCreators } from "../redux/modules/alarm";

const Header = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { game, screen, timeline, goods, community } = props;

  const alarm = useSelector((state) => state.alarm.alarmList);

  useEffect(() => {
    dispatch(alarmCreators.load_alarmMW());
  }, []);

  return (
    <Container minWidth="370px">
      <Box>
        <Game
          game={game}
          onClick={() => {
            history.push("/");
          }}
        >
          경기모임
        </Game>

        <Screen
          screen={screen}
          onClick={() => {
            history.push("/screen");
          }}
        >
          스야모임
        </Screen>

        <Community
          community={community}
          onClick={() => {
            history.push("/community");
          }}
        >
          커뮤니티
        </Community>

        <Timeline
          timeline={timeline}
          onClick={() => {
            history.push("/timeline");
          }}
        >
          타임라인
        </Timeline>

        <Goods
          goods={goods}
          onClick={() => {
            history.push("/goods");
          }}
        >
          굿즈자랑
        </Goods>

        {/* 알림 */}
        <Icon
          src={bell}
          alt="alert"
          onClick={() => {
            history.push("/alarm");
          }}
        />
        {alarm.length === 0 ? null : <RedDot />}
      </Box>

      {/* 구분선 */}
      <Rectangle />
    </Container>
  );
};

Header.defaultProps = {
  _onClick: () => {},
  nowBtn: false,
  Game: false,
  screen: false,
  timeline: false,
  goods: false,
};

export default Header;

const Container = styled.div`
  max-width: 425px;
  margin: auto;
  padding: 0;
  position: relative;
`;

const Img = styled.img`
  margin-left: 26px;
  padding-top: 20px;
`;

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 280px;
  /* margin-bottom: 11px; */
  margin-left: 26px;
  padding-top: 20px;
`;

const Game = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  margin-right: 0;
  padding-bottom: 18px;
  background: none;
  color: rgba(0, 0, 0, 0.5);

  ${(props) =>
    props.game &&
    `
    border-bottom: 2px solid;
    font-weight: bold;
    color: #F25343;
  `}
`;

const Screen = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  margin-right: 0;
  padding-bottom: 18px;
  background: none;
  color: rgba(0, 0, 0, 0.5);

  ${(props) =>
    props.screen &&
    `
    border-bottom: 2px solid;
    font-weight: bold;
    color: #F25343;
  `}
`;

const Timeline = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  margin-right: 0;
  padding-bottom: 18px;
  background: none;
  color: rgba(0, 0, 0, 0.5);

  ${(props) =>
    props.timeline &&
    `
    border-bottom: 2px solid;
    font-weight: bold;
    color: #F25343;
  `}
`;

const Community = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  margin-right: 0;
  padding-bottom: 18px;
  background: none;
  color: rgba(0, 0, 0, 0.5);

  ${(props) =>
    props.community &&
    `
    border-bottom: 2px solid;
    font-weight: bold;
    color: #F25343;
  `}
`;

const Goods = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  margin-right: 0;
  padding-bottom: 18px;
  background: none;
  color: rgba(0, 0, 0, 0.5);

  ${(props) =>
    props.goods &&
    `
    border-bottom: 2px solid;
    font-weight: bold;
    color: #F25343;
  `}
`;

const Rectangle = styled.div`
  background: #e7e7e7;
  width: 100%;
  height: 1px;
`;

// const Icon = styled(VscBell)`
//   position: absolute;
//   right: 20px;
// `;

const Icon = styled.img`
  position: absolute;
  right: 20px;
`;

const RedDot = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50px;
  background: #f25343;
  position: absolute;
  right: 20px;
`;
