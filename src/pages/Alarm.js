import React, {useEffect, useRef, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { ArrowBack } from "../components";
import { MarginBottom, NaviBar } from "../components";
import { alarmCreators } from "../redux/modules/alarm";
import { Modal } from "../components/Modal"
import RequestAlarm from "../componentAlarm/RequestAlarm";
import NormalAlarm from "../componentAlarm/NormalAlarm";


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
  // console.log("requestList", requestList)
  // console.log("ScreenAlarm", requestScreenList)
  // console.log("awaitList", awaitList)
  // console.log("awaitScreenList", awaitScreenList)
  

  useEffect(() => {
    dispatch(alarmCreators.load_alarmMW())

    dispatch(alarmCreators.requestChatListMW())
    dispatch(alarmCreators.awaitChatListMW())

    dispatch(alarmCreators.requestScreenChatListMW())
    dispatch(alarmCreators.awaitScreenChatListMW())
  }, [])


  const [selectPage, setSelectPage] = useState(true)

  return (
    <React.Fragment>

      <Container>

        <ArrowBack bg="true" fixed="fixed">
          알림
        </ArrowBack>

        <Container padding="58.39px 0 0 0">

          {/* 일반 & 승인요청 버튼 */}
          <Box position="fixed" background="#fff">
            <Warp padding="10px 0 0 0">
              <NormalBtn
                onClick={() => setSelectPage(true)}
                selectPage={selectPage}
              >
                일반
              </NormalBtn>

              <RequestBtn
                onClick={() => setSelectPage(false)}
                selectPage={selectPage}
              >
                승인요청
              </RequestBtn>
            </Warp>

            <Rectangle />
          </Box> 

          <Scroll>
            {selectPage === true ? (
              <NormalAlarm
                alarm={alarm}
                awaitList={awaitList}
                awaitScreenList={awaitScreenList}
              />
            ) : (
              <RequestAlarm 
                alarm={alarm}
                requestList={requestList}
                requestScreenList={requestScreenList}
              />
            )}
          </Scroll>     

          {!props.is_login && (
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

        
      </Container>
      {/* <MarginBottom /> */}
      <NaviBar />
    </React.Fragment>
  )
}

export default Alarm


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


const Box = styled.div`
  max-width: 425px;
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
  z-index: 1;
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


const Rectangle = styled.div`
	background: #C4C4C4;
	width: 100%;
	border: 1px solid #E7E7E7;
	margin-top: ${(props) => props.marginT};
`;



const NormalBtn = styled.button`
  width: 50%;
  height: 40px;
  background-color: #fff;
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

const RequestBtn = styled.button`
  width: 50%;
  height: 40px;
  background-color: #fff;
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

const Scroll = styled.div`
  padding: 51.5px 0 64px 0;
  /* &::-webkit-scrollbar {
    display: none;
  } */
`;