import React from "react";
import styled from "styled-components";
import { ArrowBack, Container, Text } from "../components";
import Question from "../shared/icon/Question.png";

export const CommunityDetail = (props) => {
  const { filePath, myTeam, content, userName, communityUserPicture } = props;
  const img = process.env.REACT_APP_IMAGES_BASE_URL + filePath;
  return (
    <div>
      <ArrowBack>커뮤니티</ArrowBack>
      <Border />
      <Container>
        <Card>
          <UserInfo>
            <UserImg src={communityUserPicture} />
            <InfoBox>
              <Text>{userName}</Text>
              <Time>
                <Text margin="0 10px 0 0">{myTeam}</Text>
                <Text>시간</Text>
              </Time>
            </InfoBox>
          </UserInfo>
          <TextBox>{content}</TextBox>
          <img src={img} alt="커뮤니티 이미지" />
          <Border />
          <Good>
            <img src={Question} alt="말풍선" />
            <Text size="12px" margin="0 0 0 7px">
              숫자
            </Text>
          </Good>

          <Boundary />
        </Card>
      </Container>
    </div>
  );
};

const Border = styled.div`
  width: 100%;
  border: 1px solid #e7e7e7;
  margin: ${(props) => props.margin};
`;

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

const Boundary = styled.div`
  background: #f8f8f8;
  width: 100%;
  height: 6px;
`;

const Good = styled.div`
  display: flex;
  margin: 15px;
`;
