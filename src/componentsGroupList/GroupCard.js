import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Progress from "../components/Progress";

import colorUsers from "../shared/icon/colorUsers.svg";

const GroupCard = (props) => {
  const history = useHistory();
  let team = props.name;
  console.log(team);
  return (
    <Container
      onClick={() => {
        history.push("/groupdetail/" + props.groupId);
      }}
    >
      <Card>
        <Warp margin="0 0 16px 0">
          <Warp flex="flex" margin="0 0 12px 0">
            <Ellipse borderColor="#F25343" background="#F25343" color="#FFFFFF">
              모집중
            </Ellipse>
            <Ellipse borderColor="#498C9A" color="#498C9A" marginLeft="6px">
              D-10
            </Ellipse>
          </Warp>
          <Warp flex="flex">
            <Text size="12px" color="#777777">
              {props.groupDate}
            </Text>
            <Slice> &ensp;|&ensp; </Slice>
            <Text size="12px" color="#777777">
              {props.stadium}
            </Text>
            <Slice> &ensp;|&ensp; </Slice>
            <Text size="12px" color="#777777">
              최대 {props.peopleLimit}명
            </Text>
          </Warp>
        </Warp>
        <Circle width="48px" height="48px" />

        <Text
          size="16px"
          weight="bold"
          width="295px"
          height="46px"
          lineHeight="23px"
        >
          {props.title}
        </Text>

        <Warp
          flex="flex"
          justify="space-between"
          align="center"
          margin="10px 0 0 0"
        >
          <Progress group={props} />
          <Warp flex="flex">
            <img src={colorUsers} alt="users" />
            <Text size="12px" color="#F25343" weight="bold" spacing="-0.03em;">
              &nbsp;{props.canApplyNum}명&nbsp;
            </Text>
            <Text size="12px" color="#F25343" spacing="-0.03em;">
              남음
            </Text>
          </Warp>
        </Warp>
      </Card>
    </Container>
  );
};

export default GroupCard;

const Container = styled.div`
  width: 335px;
  /* height: 177px; */
  margin: 20px auto;
`;

const Warp = styled.div`
  /* width: 100%; */
  display: ${(props) => props.flex};
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  margin-left: ${(props) => props.marginLeft};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  position: ${(props) => props.position};
`;

const Text = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.color};
  letter-spacing: ${(props) => props.spacing};
  margin: ${(props) => props.margin};
  line-height: ${(props) => props.lineHeight};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  /* white-space: nowrap; */
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Card = styled.div`
  width: 335px;
  height: 177px;
  padding: 18px;
  background: #ffffff;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  position: relative;
`;

const Ellipse = styled.div`
  width: 55px;
  height: 24px;
  background: ${(props) => props.background};
  border: 1px solid ${(props) => props.borderColor};
  border-radius: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 1px;
  margin-left: ${(props) => props.marginLeft};
  font-weight: bold;
  font-size: 12px;
  color: ${(props) => props.color};
`;

const Circle = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 50%;
  background: #c4c4c4;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  position: absolute;
  left: 78.51%;
  right: 7.16%;
  top: 12%;
  bottom: 61.02%;
`;

const Slice = styled.div`
  color: rgba(196, 196, 196, 0.3);
  font-size: 12px;
`;
