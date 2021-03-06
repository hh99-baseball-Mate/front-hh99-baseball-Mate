import React, { useState } from "react"
import styled from "styled-components"
import Question from "../../shared/icon/Question.png"
import { useDispatch } from "react-redux"
import { AiOutlineEllipsis } from "react-icons/ai"
import { Text } from "../../components/element"
import { Modal } from "../../components/common"
import { actionCreators as communityCr } from "../../redux/modules/community"
import { history } from "../../redux/configStore"
import { useProfile } from "../../components/customHook/useProfile"

export const CommunityCard = (props) => {
  const dispatch = useDispatch()

  const {
    myTeam,
    content,
    userName,
    communityUserPicture,
    dayBefore,
    communityId,
    communityCommentList,
    usertype,
  } = props

  //게시글 이미지

  const [userImg] = useProfile(usertype, communityUserPicture)

  // 모달 보여주기/숨기기
  const [showModal, setShowModal] = useState(false)

  // 삭제/수정 모달내용
  const modalData = {
    title: "커뮤니티 에디터",
    descriptionOne: "선택하신 게시글을 삭제 하시겠습니까?",
    descriptionTwo: "삭제되면 다시 복원할 수 없습니다.",
    btnClose: "취소",
    btnUpdate: "삭제",
  }
  //삭제 버튼
  const deleteBtn = () => {
    dispatch(communityCr.deleteCommunityAPI(communityId))
    setShowModal(false)
  }

  return (
    <div>
      <Card
        onClick={() => {
          history.push(`/community/communitydetail/${communityId}`)
        }}
      >
        <UserInfo>
          <UserImg url={userImg} />
          <InfoBox>
            <Text bold>{userName}</Text>
            <Time>
              <Text size="12px" color="#F25343" margin="0 10px 0 0">
                {myTeam}
              </Text>
              <Text size="12px" color="#C4C4C4">
                {dayBefore}
              </Text>
            </Time>
          </InfoBox>
        </UserInfo>
        <TextBox>{content}</TextBox>
        <Border />
        <Good>
          <CommentIcon src={Question} alt="말풍선" />

          <Text size="12px" margin="0 0 0 7px">
            {communityCommentList ? communityCommentList.length : "0"}
          </Text>
        </Good>

        <Boundary />
      </Card>
      {/* 모달 */}
      {showModal && (
        <Modal
          center
          setShowModal={setShowModal}
          modalData={modalData}
          deleteBtn={deleteBtn}
        ></Modal>
      )}
    </div>
  )
}

const Card = styled.div`
  width: 100%;
  cursor: pointer;
  margin-top: 20px;
`

const UserImg = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-image: url(${(props) => props.url});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  border: 1px solid #e7e7e7;
`

const UserInfo = styled.div`
  display: flex;
`

const InfoBox = styled.div`
  flex-direction: column;
  display: "flex";
  margin-left: 12px;
`

const Time = styled.div`
  display: flex;
  margin-top: 5px;
`

const TextBox = styled.div`
  width: 100%;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 20px 0;
`

const Border = styled.div`
  border: 1px solid #e7e7e7;
  width: 100%;
`

const Boundary = styled.div`
  background: #f8f8f8;
  width: 100%;
  height: 6px;
`

const Good = styled.div`
  display: flex;
  margin: 10px;
`

const MoreIcons = styled(AiOutlineEllipsis)`
  align-items: center;
  margin: 7.5px 0;
  cursor: pointer;
  position: absolute;
  right: 70px;
`

const CommentIcon = styled.img`
  width: 12px;
  height: 12px;
`
