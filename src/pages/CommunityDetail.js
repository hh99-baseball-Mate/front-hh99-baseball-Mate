import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { ArrowBack, Container, Text } from "../components";
import Question from "../shared/icon/Question.png";
import { actionCreators as actionCr } from "../redux/modules/communityDetail";
import { useParams } from "react-router";
import CommunityComment from "../communityList/CommunityComment";
import { BsThreeDots } from "react-icons/bs";
import { history } from "../redux/configStore";
import { Modal } from "../components/Modal";
import { actionCreators as communityDetailCr } from "../redux/modules/communityDetail";
import { actionCreators as communityCr } from "../redux/modules/community";
import { findIndex } from "lodash";
import { UserProfile } from "../componentsGoods/UserProfile";
export const CommunityDetail = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const communityId = params.communityId;
  const detail_list = useSelector((state) => state.communityDetail.detail_list);
  console.log(detail_list, "프롤");
  //댓글 사진
  // const usertype = detail_list.usertype;
  const {
    communityUserPicture,
    content,
    filePath,
    myTeam,
    userName,
    communityCommentList,
    usertype,
  } = detail_list;
  const img = process.env.REACT_APP_IMAGES_BASE_URL + filePath;
  const user_img = process.env.REACT_APP_IMAGES_BASE_URL + communityUserPicture

  // console.log(props.match.params.communityId, "프롤스다");
  const communCommentId = props.match.params.communityId;
  useEffect(() => {
    dispatch(actionCr.getCommunDetailAPI(communityId));
  }, [detail_list.communityCommentList?.length]);

  // 모달 보여주기/숨기기
  const [showModal, setShowModal] = useState(false);

  const modalData = {
    title: "커뮤니티 에디터",
    descriptionOne: "선택하신 게시글을 삭제 하시겠습니까?",
    descriptionTwo: " 게시글을 수정하시겠습니까?",
    btnClose: "취소",
    btnUpdate: "삭제",
    btnConfirm: "수정",
  };

  //삭제 버튼
  const deleteBtn = () => {
    console.log("놀러");
    dispatch(communityCr.deleteCommunityAPI(communityId));
    setShowModal(false);
  };

  //수정 버튼
  const updataBtn = () => {
    history.push(`/community/communitydetail/editcommuncomment/${communityId}`);
  };

  // 유저정보= 게시글 쓴 사람 정보 확인용
  const user_info = useSelector((state) => state.user.user_info);
  const writer = useSelector((state) => state.communityDetail?.detail_list);

  const user_info_id = user_info.useridx;
  const writer_id = writer.userId;

  //댓글 사진
  const userImg = () => {
    if (usertype === "kakao") {
      return communityUserPicture;
    }
    if (usertype === "normal") {
      return process.env.REACT_APP_IMAGES_BASE_URL + communityUserPicture;
    }
  };
  return (
    <>
      <ArrowBack>커뮤니티</ArrowBack>
      <Border />
      <Container>
        <Card {...detail_list}>
          {user_info_id === writer_id ? (
            <MoreIcons onClick={() => setShowModal(true)} />
          ) : (
            ""
          )}

          <UserInfo>
            <UserProfile size="32" url={userImg} />
            <InfoBox>
              <Text bold>{userName}</Text>
              <Time>
                <Text size="12px" color="#F25343" margin="0 10px 0 0">
                  {myTeam}
                </Text>
                {/* <Text size="12px" color="#C4C4C4">
                  시간
                </Text> */}
              </Time>
            </InfoBox>
          </UserInfo>
          <TextBox>{content}</TextBox>
          <FileImg src={img} alt="커뮤니티 이미지" />
          <Border />
          <Good>
            <img src={Question} alt="말풍선" />
            <Text size="12px" margin="0 0 0 7px">
              {communityCommentList ? communityCommentList.length : "0"}
            </Text>
          </Good>

          <Boundary />
        </Card>

        <CommunityComment {...detail_list} communCommentId={communCommentId} />
      </Container>
      {showModal && (
        <Modal
          three
          setShowModal={setShowModal}
          modalData={modalData}
          deleteBtn={deleteBtn}
          updataBtn={updataBtn}
        ></Modal>
      )}
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
  position: relative;
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

const MoreIcons = styled(BsThreeDots)`
  align-items: center;
  margin: 7.5px 0;
  cursor: pointer;
  position: absolute;
  right: 20px;
`;
