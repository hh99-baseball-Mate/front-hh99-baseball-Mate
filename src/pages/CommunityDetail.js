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
import { actionCreators as communityCr } from "../redux/modules/community";
import { UserProfile } from "../components/UserProfile";
export const CommunityDetail = (props) => {
  const dispatch = useDispatch();
  // params의 값 가져오기
  const params = useParams();
  // 커뮤니티 ID
  const communityId = params.communityId;
  console.log(communityId, "군고구마");

  //디테일페이지 data
  const detail_list = useSelector((state) => state.communityDetail.detail_list);

  const {
    communityUserPicture,
    content,
    filePath,
    myTeam,
    userName,
    communityCommentList,
    usertype,
  } = detail_list;

  //커뮤니티 사진
  const img = process.env.REACT_APP_S3_COMMU_URL + filePath;

  //디테일페이지 data를 댓글달때마다 재랜더링
  useEffect(() => {
    dispatch(actionCr.getCommunDetailAPI(communityId));
  }, [detail_list.communityCommentList?.length]);

  // 모달 보여주기/숨기기
  const [showModal, setShowModal] = useState(false);

  //모달내용
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
        {/* 디테일 data 받기 */}
        <Card {...detail_list}>
          {/* 유저정보보고 삭제버튼 유무 */}
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
              </Time>
            </InfoBox>
          </UserInfo>
          <TextBox>{content}</TextBox>
          <FileImg src={img} alt="커뮤니티 이미지" />
          <Border />
          <Good>
            <CommentIcon src={Question} alt="말풍선" />
            {/* 댓글 수 */}
            <Text size="12px" margin="0 0 0 7px">
              {communityCommentList ? communityCommentList.length : "0"}
            </Text>
          </Good>

          <Boundary />
        </Card>
        {/*댓글에서 디테일 data가져오기 */}
        <CommunityComment {...detail_list} communityId={communityId} />
      </Container>
      {/* 모달ㄴ */}
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

const CommentIcon = styled.img`
  width: 12px;
  height: 12px;
`;
