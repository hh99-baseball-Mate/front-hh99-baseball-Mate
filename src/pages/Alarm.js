import React, {useEffect, useRef, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { ArrowBack } from "../components";
import { MarginBottom, NaviBar } from "../components";
import { alarmCreators } from "../redux/modules/alarm";
import { Modal } from "../components/Modal"


const Alarm = (props) => {
  const dispatch = useDispatch()

  const alarm = useSelector((state) => state.alarm.alarmList)
  // (방장이 참여자들을)승인 요청 목록
  const requestList = useSelector((state) => state.alarm?.requestList)
  // (참여자기준) 대기중인 신청 목록
  const awaitList = useSelector((state) => state.alarm?.awaitList)

  // 스크린야구 (방장이 참여자들을)승인 요청 목록
  const requestScreenList = useSelector(
    (state) => state.alarm.requestScreenList
  )
  // 스크린야구 (참여자기준) 대기중인 신청 목록
  const awaitScreenList = useSelector((state) => state.alarm.awaitScreenList)

  // console.log("alarm", alarm)
  // console.log("ScreenAlarm", requestScreenList)
  // console.log("awaitScreenList", awaitScreenList)
  // console.log("awaitList", awaitList)

  useEffect(() => {
    dispatch(alarmCreators.load_alarmMW())
    dispatch(alarmCreators.requestChatListMW())
    dispatch(alarmCreators.awaitChatListMW())

    dispatch(alarmCreators.requestScreenChatListMW())
    dispatch(alarmCreators.awaitScreenChatListMW())
  }, [])


  const [selectPage, setSelectPage] = useState(true)

  return (
    <>

    <Container>
    <ArrowBack bg="true" fixed="fixed">
    알림
    </ArrowBack>


      <Container padding="58.39px 0 0 0">

      {/* 일반 & 승인요청 버튼 */}
      {/* <Box height="65px">
        <Warp padding="10px 0 0 0">
          <ParticipantBtn
            onClick={() => setSelectPage(true)}
            selectPage={selectPage}
          >
            일반
          </ParticipantBtn>

          <CommentBtn
            onClick={() => setSelectPage(false)}
            selectPage={selectPage}
          >
            승인요청
          </CommentBtn>
        </Warp>

        <Rectangle />

        {selectPage === true ? (
          <Participant
            {...loadDetail}
            {...mylist}
            // close={close}
            // setClose={setClose}
            join={join}
            setJoin={setJoin}
          />
        ) : (
          <Comment {...loadDetail} {...mylist} />
        )}
      </Box>       */}






        {props.is_login ? (
          alarm.map((alarm) => {
            return (
              <Alert
                key={alarm.id}
                {...alarm}
                requestList={requestList}
                requestScreenList={requestScreenList}
              />
            )
          })
        ) : (
          <Container
            position="absolute"
            top="50%"
            right="-50%"
            trans="translateY(-50%)"
          >
            <Warp flex="flex">
              <Text margin="auto">로그인 후 이용해주세요</Text>
            </Warp>
          </Container>
        )}
      </Container>

      <MarginBottom />
      <NaviBar />
    </Container>
    </>
  )
}

export default Alarm



// 개별 알람 컴포넌트
const Alert = (props) => {
  const dispatch = useDispatch()
  // console.log("props", props)

  // 경기모임 누가 요청했는지 찾기
  const num = props.requestList.findIndex(
    (list) => list.joinRequestId === props.joinRequestId
  )
  const requestList = props.requestList[num]

  // 스야모임 누가 요청했는지 찾기
  const screenNum = props.requestScreenList.findIndex(
    (list) => list.joinRequestId === props.joinRequestId
  )
  const requestScreenList = props.requestScreenList[screenNum]

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

  // 모달
  const [showModal, setShowModal] = useState(false)

  const modalData = {
    title: "알람 에디터",
    descriptionOne: "알람을 확인/삭제 하시겠습니까?",
    btnClose: "취소",
    btnConfirm: "승인",
    btnUpdate: "삭제",
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
    <Container position="relative">
      <AlertCard onClick={() => setShowModal(true)}>
        <div>🔔</div>
        {/* <div>🔔</div>
        <div>🔔</div> */}

          <Text size="12px" width="70%">
            <Warp
              flex="flex"
              direction="column"
              align="flex-start"
              justify="flex-start"
            >
              <div>{contents[0]}</div>
              <div>
                {contents[1]}
                {contents[2]}
              </div>
              <div>{contents[3]}</div>
              {/* {
							contents.map((list, idx) => {
								return <div key={idx}>{list}</div> 
							})
						} */}
            </Warp>
          </Text>
 

        <Text size="10px" color="#777777">
          <Warp flex="flex" direction="column" align="center">
            <div style={{ marginBottom: "3px" }}>{day}</div>
            <div>{time}</div>
          </Warp>
        </Text>
      </AlertCard>
      <Rectangle />

      {/* 경기모임일 때 모달창 */}
      {num !== -1 && showModal && (
        <Modal
          three
          setShowModal={setShowModal}
          modalData={modalData}
          updataBtn={allow}
          deleteBtn={refuse}
        ></Modal>
      )}

      {/* 스크린야구 모임일 때 모달창 */}
      {screenNum !== -1 && showModal && (
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
          center
          setShowModal={setShowModal}
          modalData={modalData}
          deleteBtn={delNormalAlert}
        ></Modal>
      )}
    </Container>
  )
}


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

const Circle = styled.div`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background: #C4C4C4;
	/* border: 1px solid #E7E7E7; */
  display: flex;
  justify-content: center;
  align-items: center;
	/* margin-left: 8px; */
`;

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





const ParticipantBtn = styled.button`
  width: 50%;
  height: 45px;
  background: none;
  padding-bottom: 10px;
  border: none;
  font-size: 16px;
  color: #777777;
  ${(props) =>
    props.selectPage
      ? ` 
		border-bottom: 3px solid #F25343;
		font-size: 16px;
		color: #F25343; 
		font-weight: bold;`
      : `border: none;`}
`

const CommentBtn = styled.button`
  width: 50%;
  height: 45px;
  background: none;
  padding-bottom: 10px;
  border: none;
  font-size: 16px;
  color: #777777;
  /* margin-right: 0; */
  ${(props) =>
    !props.selectPage
      ? `
		border-bottom: 3px solid #F25343;
		font-size: 16px;
		color: #F25343; 
		font-weight: bold;`
      : `border: none;`}
`