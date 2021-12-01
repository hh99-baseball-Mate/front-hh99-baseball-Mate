import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { alarmCreators } from "../redux/modules/alarm";
import { Modal } from "../components/Modal"
import { useHistory } from "react-router";

const AlarmCard = (props) => {

  const history = useHistory()
	const dispatch = useDispatch()
  // console.log("AlarmCard", props)

  // 모달
	const [showModal, setShowModal] = useState(false)

  let modalData = {}
  if (props.alarmType === "Normal") {

    modalData = {
      title: "알람 에디터",
      descriptionOne: "알람을 확인/삭제 하시겠습니까?",
      btnClose: "취소",
      btnConfirm: "보기",
      btnUpdate: "삭제",
    }

  } else {
    modalData = {
      title: "알람 에디터",
      descriptionOne: "알람을 확인/삭제 하시겠습니까?",
      btnClose: "취소",
      btnConfirm: "승인",
      btnUpdate: "삭제",
    }
  }



  
  let num = null
  let requestList = null
  let screenNum = null
  let requestScreenList = null

  if(props.request) {

    // 경기모임 누가 요청했는지 찾기
    num = props.requestList.findIndex(
      (list) => list.joinRequestId === props.joinRequestId)
    requestList = props.requestList[num]

    // 스야모임 누가 요청했는지 찾기
    screenNum = props.requestScreenList.findIndex(
      (list) => list.joinRequestId === props.joinRequestId)
    requestScreenList = props.requestScreenList[screenNum]
  }

  
  let userImg = ""
  if(props.request) {

    if(props.alarmType === "Group") {
      userImg = requestList.profileImg
    } else {
      userImg = requestScreenList.profileImg;
    }
  }

  
  // 서버주소
  const IMAGES_BASE_URL = process.env.REACT_APP_IMAGES_BASE_URL

  // 사진 ip주소 + 사진이름 조합
  const ip = IMAGES_BASE_URL
  // const img = props.filePath

  // 기본 로그인일 때 프로필 사진
  const profileImg = ip + userImg
  
  // kakaocdn (카카오 프사인지 확인)
  const kakaoCheck = props.userImg?.split(".")[1]
  const kakaoImg = props.userImg


  // 그룹참가 허용
  const allow = () => {
    if (window.confirm("정말 허용하시겠습니까?")) {
      dispatch(alarmCreators.alarmComfirmMW(requestList?.joinRequestId, true))
      setShowModal(false)
      delAlert()
    }
  }

  // 그룹참가 거절
  const refuse = () => {
    if (window.confirm("정말 거절하시겠습니까?")) {
      dispatch(alarmCreators.alarmComfirmMW(requestList?.joinRequestId, false))
      setShowModal(false)
      delAlert()
    }
  }

  // 스크린야구 그룹참가 허용
  const allowScreen = () => {
    if (window.confirm("정말 허용하시겠습니까?")) {
      dispatch(
        alarmCreators.alarmScreenComfirmMW(
          requestScreenList?.joinRequestId,
          true
        )
      )
      setShowModal(false)
      delAlert()
    }
  }

  // 스크린야구 그룹참가 거절
  const refuseScreen = () => {
    if (window.confirm("정말 거절하시겠습니까?")) {
      dispatch(
        alarmCreators.alarmScreenComfirmMW(
          requestScreenList?.joinRequestId,
          false
        )
      )
      setShowModal(false)
      delAlert()
    }
  }


  // 게시글이동
  const movePost = () => {
    if(props.normalType === "group") {
      return history.push(`/groupdetail/${props.postId}`)
    } else if(props.normalType === "screen") {
      return history.push(`/screen/screendetail/${props.postId}`)
    } else if(props.normalType === "community") {
      return history.push(`/community/communitydetail/${props.postId}`)
    } else if(props.normalType === "goods") {
      return history.push(`/goods/`)
    }
  }



  // 알람삭제
  const delAlert = () => {
    dispatch(alarmCreators.del_alarmMW(props.id))
    setShowModal(false)
  }

  // 일반 알림 삭제
  const delNormalAlert = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      dispatch(alarmCreators.del_alarmMW(props.id))
    }
  }

  const dayAndTime = props.modifiedAt.split(" ")
  const day = dayAndTime[0]
  const time = dayAndTime.slice(1, 3).join(" ")
  // console.log(time)

  const contents = props.contents.split("*")
  // console.log(contents)

	return (
    <React.Fragment>

		<Container position="relative">
      <AlertCard onClick={() => setShowModal(true)}>
        
        {
          props.request ?
          <Img url={kakaoCheck === "kakaocdn" ? kakaoImg : profileImg} />
          :
          <div>🔔</div>
        }
				

          <Text size="12px" width="70%">
            <Warp
              flex="flex"
              direction="column"
              align="flex-start"
              justify="flex-start"
            >
              { //경기모임 표시
                (props.request && num !== -1) &&
                <Ellipse
                  borderColor="#F25343"
                  background="#F25343"
                  color="#FFFFFF"
                >
                  경기모임
                </Ellipse>
              }

              { //스야모임 표시
                (props.request && screenNum !== -1) &&
                <Ellipse
                  borderColor="#F25343"
                  background="#FFF"
                  color="#F25343"
                >
                  스야모임
                </Ellipse>
              }

              <div>{contents[0]}</div>
              <div>
                {contents[1]}
                {contents[2]}
              </div>
              <div>{contents[3]}</div>
            </Warp>
          </Text>
 

        <Text size="8px" color="#777777">
          <Warp flex="flex" direction="column" align="center">
            <div style={{ marginBottom: "3px" }}>{day}</div>
            <div>{time}</div>
          </Warp>
        </Text>
      </AlertCard>
      <Rectangle />

      {/* 경기모임일 때 모달창 */}
      {props.alarmType === "Group" && showModal && (
        <Modal
          three
          setShowModal={setShowModal}
          modalData={modalData}
          updataBtn={allow}
          deleteBtn={refuse}
        ></Modal>
      )}

      {/* 스크린야구 모임일 때 모달창 */}
      {props.alarmType === "Screen" && showModal && (
        <Modal
          three
          setShowModal={setShowModal}
          modalData={modalData}
          updataBtn={allowScreen}
          deleteBtn={refuseScreen}
        ></Modal>
      )}

      {/* 일반 알람일 때 모달창 */}
      {props.alarmType === "Normal" && showModal && (
        <Modal
          three
          setShowModal={setShowModal}
          modalData={modalData}
          updataBtn={movePost}
          deleteBtn={delNormalAlert}
        ></Modal>
      )}
    </Container>

    </React.Fragment>
	)
}

export default AlarmCard;


const Container = styled.div`
  max-width: 425px;
	width: 100%; 
	/* height: 177px; */
	/* margin: auto; */
	/* position: relative; */
  padding: ${(props) => props.padding};
	position: ${(props) => props.position};
	top: ${(props) => props.top};
	left: ${(props) => props.left};
	transform: ${(props) => props.trans};
`;

const AlertCard = styled.div`
 max-width: 425px;
	width: 100%;
	height: 72px;
	padding: 8px 10px 8px 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	/* position: relative; */
`;

const Box = styled.div`
	width: 100%;
	height: ${(props) => props.height};
	background: ${(props) => props.background};
	padding: ${(props) => props.padding};
	margin: ${(props) => props.margin};
	margin-bottom: ${(props) => props.bottom};
	display: ${(props) => props.flex};
	flex-direction: ${(props) => props.direction};
	justify-content: ${(props) => props.justify};
	align-items: ${(props) => props.align};
	position: ${(props) => props.position};
`;

const Warp = styled.div`
	/* width: 100%; */
	display: ${(props) => props.flex};
	flex-direction: ${(props) => props.direction};
	justify-content: ${(props) => props.justify};
	align-items: ${(props) => props.align};
	margin-left: ${(props) => props.marginLeft};
	margin-bottom: ${(props) => props.bottom};
	margin: ${(props) => props.margin};
	padding: ${(props) => props.padding};
	position: ${(props) => props.position};
	top: ${(props) => props.top};
	right: ${(props) => props.right};
`;

const Text = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.color};
  margin: ${(props) => props.margin};
  line-height: ${(props) => props.lineHeight};
	cursor: pointer;
`;

const Img = styled.div`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background-color: #C4C4C4;
  /* display: flex;
  justify-content: center;
  align-items: center; */
	/* border: 1px solid; */
	background: url(${(props) => props.url});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
`;


const Ellipse = styled.div`
  width: 50px;
  height: 20px;
  background: ${(props) => props.background};
  border: 1px solid ${(props) => props.borderColor};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 1px;
  margin-left: ${(props) => props.marginLeft};
  font-weight: bold;
  font-size: 10px;
  color: ${(props) => props.color};
`

const List = styled.div`
 	height: 62vh;
	overflow: auto;
`;

const Rectangle = styled.div`
	background: #C4C4C4;
	width: 100%;
	border: 1px solid #E7E7E7;
	margin-top: ${(props) => props.marginT};
`;



