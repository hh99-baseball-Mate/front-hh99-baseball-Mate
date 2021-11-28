import React, { useState } from "react";
import styled from "styled-components";
import { Text } from "../components";
import Question from "../shared/icon/Question.png";
import Progress from "../components/Progress";
const CommunityCard = (props) => {
  const { myTeam, content, userName, communityUserPicture, onClick } = props;
  const img = process.env.REACT_APP_IMAGES_BASE_URL + communityUserPicture;
  return (
    <Card onClick={onClick}>
      <UserInfo>
        <UserImg src={img} />
        <InfoBox>
          <Text bold>{userName}</Text>
          <Time>
            <Text size="12px" color="#F25343" margin="0 10px 0 0">
              {myTeam}
            </Text>
            <Text size="12px" color="#C4C4C4">
              시간
            </Text>
          </Time>
        </InfoBox>
      </UserInfo>
      <TextBox>{content}</TextBox>
      <Border />
      <Good>
        <img src={Question} alt="말풍선" />
        <Text size="12px" margin="0 0 0 7px">
          숫자
        </Text>
      </Good>

      <Boundary />
    </Card>
  );
};

export default CommunityCard;

const Card = styled.div`
  width: 100%;
  height: 225px;
  margin-top: 20px;
`;

const UserImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: aliceblue;
  border: 1px solid #e7e7e7;
`;

const UserInfo = styled.div`
  display: flex;
`;

const InfoBox = styled.div`
  flex-direction: column;
  display: "flex";
  margin-left: 12px;
`;

const Time = styled.div`
  display: flex;
  margin-top: 5px;
`;

const TextBox = styled.div`
  width: 100%;
  height: 60px;
  font-size: 14px;
  margin-top: 14px;
`;

const Border = styled.div`
  border: 1px solid #e7e7e7;
  width: 100%;
  margin-top: 55px;
`;

const Boundary = styled.div`
  background: #f8f8f8;
  width: 100%;
  height: 6px;
`;

const Good = styled.div`
  display: flex;
  margin: 15px;
`;
