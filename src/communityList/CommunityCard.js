import React, { useState } from "react";
import { BsTranslate } from "react-icons/bs";
import styled from "styled-components";
import { Text } from "../components";
import Question from "../shared/icon/Question.png";
const CommunityCard = (props) => {
  return (
    <Card>
      <UserInfo>
        <UserImg />
        <InfoBox>
          <Text>제목</Text>
          <Time>
            <Text>롯테</Text>
            <Text>시간</Text>
          </Time>
        </InfoBox>
      </UserInfo>
      <TextBox>내용</TextBox>
      <Border />
      <Good>
        <img src={Question} alt="말풍선" />
        <Text size="12px">숫자</Text>
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
  background: tomato;
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
  margin-left: 30px;
`;

const Time = styled.div`
  display: flex;
`;

const TextBox = styled.div`
  width: 100%;
  height: 60px;
  background: yellowgreen;
  font-size: 14px;
  margin-top: 14px;
`;

const Border = styled.div`
  border: 1px solid #e7e7e7;
  width: 100%;
  margin-top: 55px;
`;

const Boundary = styled.div`
  background: yellowgreen;
  width: 100%;
  height: 6px;
`;

const Good = styled.div`
  display: flex;
  margin: 15px;
`;
