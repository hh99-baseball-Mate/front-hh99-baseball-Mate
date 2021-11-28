import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { ArrowBack, Container, Text } from "../components";
import Question from "../shared/icon/Question.png";
import { actionCreators as actionCr } from "../redux/modules/communityDetail";
import { useParams } from "react-router";
import CommunityComment from "../communityList/CommunityComment";

export const CommunityDetail = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const communityId = params.communityId;

  const detail_list = useSelector((state) => state.communityDetail.detail_list);

  const { communityUserPicture, content, filePath, myTeam, userName } =
    detail_list;
  const img = process.env.REACT_APP_IMAGES_BASE_URL + filePath;
  const user_img = process.env.REACT_APP_IMAGES_BASE_URL + communityUserPicture;
  console.log(detail_list.communityCommentList?.length, "디테일");

  // console.log(props.match.params.communityId, "프롤스다");
  const communCommentId = props.match.params.communityId;
  useEffect(() => {
    dispatch(actionCr.getCommunDetailAPI(communityId));
  }, [detail_list.communityCommentList?.length]);

  return (
    <>
      <ArrowBack>커뮤니티</ArrowBack>
      <Border />
      <Container>
        <Card {...detail_list}>
          <UserInfo>
            <UserImg src={user_img} />
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
          <FileImg src={img} alt="커뮤니티 이미지" />
          <Border />
          <Good>
            <img src={Question} alt="말풍선" />
            <Text size="12px" margin="0 0 0 7px">
              숫자
            </Text>
          </Good>

          <Boundary />
        </Card>

        <CommunityComment {...detail_list} communCommentId={communCommentId} />
      </Container>
    </>
  );
};

const Border = styled.div`
  width: 100%;
  border: 1px solid #e7e7e7;
  margin: ${(props) => props.margin};
`;

const Card = styled.div`
  width: 100%;
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

const FileImg = styled.img`
  max-width: 335px;
`;
