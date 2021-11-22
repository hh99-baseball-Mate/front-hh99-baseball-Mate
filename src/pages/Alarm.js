import React, {useEffect, useRef, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { ArrowBack } from "../components";
import { MarginBottom, NaviBar } from "../components";
import { alarmCreators } from "../redux/modules/alarm";
import { Modal } from "../components/Modal"


const Alarm = (props) => {

	const dispatch = useDispatch();

	const alarm = useSelector(state => state.alarm.alarmList)
	// (방장이 참여자들을)승인 요청 목록
	const allow_list = useSelector((state) => state.alarm?.requestList);
	// (참여자기준) 대기중인 신청 목록
	const awaitList = useSelector((state) => state.alarm?.awaitList);

	console.log("awaitList", awaitList)

	useEffect(() => {
		dispatch(alarmCreators.load_alarmMW())
		dispatch(alarmCreators.requestChatListMW())
		dispatch(alarmCreators.awaitChatListMW())
	}, [])


	return (
		<React.Fragment>
			<Container>
				<ArrowBack bg="true">알림</ArrowBack>

				<Rectangle marginT="35px"/>

				{ alarm.map((alarm) => {
					return <Alert key={alarm.id} {...alarm} allow_list={allow_list} />
				})}

				{props.is_login ? (
					<p>내 알림</p>
					) : (
						<p>로그인 후 이용해주세요</p>
					)
				}
				
			</Container>
			<MarginBottom/>
			<NaviBar rec/>
		</React.Fragment>
	)
}

export default Alarm;

// 개별 알람 컴포넌트
const Alert = (props) => {

	const dispatch = useDispatch();

	// const [joinAllow, setJoinAllow] = useState(false)

	// 채팅 승인 목록
	// const allow_list = useSelector((state) => state.alarm?.requestList);

	// console.log("요청", props.joinRequestId, typeof(props.joinRequestId))
	// console.log("리스트", props.allow_list.join_id, )

	// 누가 요청했는지 찾기
	const num = props.allow_list.findIndex(list => list.join_id === props.joinRequestId)
	// console.log(num)
	// console.log("gg", props.allow_list[num])
	const allow_list = props.allow_list[num]

	// console.log("1122",allow_list)
	// console.log("알람", props.allow_list[num].join_id)

	// 그룹참가 허용
	const allow = () => {
		dispatch(alarmCreators.alarmComfirmMW(allow_list?.join_id, true))
		setShowModal(false)
	}

	// 그룹참가 거절
	const refuse = () => {
		dispatch(alarmCreators.alarmComfirmMW(allow_list?.join_id, false))
		setShowModal(false)
	}

	// 모달
	const [showModal, setShowModal] = useState(false)

	const modalData = {
    title: "알람 에디터",
    descriptionOne: "알람을 확인/삭제 하시겠습니까?",
    btnClose: "취소",
    btnConfirm: "승인",
    btnUpdate: "거절",
  }

	const delAlert = () => {
		dispatch(alarmCreators.del_alarmMW(props.id))
		setShowModal(false)
	}

	const day = props.modifiedAt.split(" ")[0]
	const time = props.modifiedAt.split(" ")[1]

	return (
		<React.Fragment>
			<AlertCard onClick={() => setShowModal(true)}>
				<div >
					{/* <Circle/> */}🔔
				</div>
				<Warp margin="0 21px">
					{/* <Text size="14px" weight="500" bottom="3px">
						🔔 알람이 왔어요! 🔔
					</Text> */}
					<Text size="14px" height="17px">
						{props.contents}
					</Text>
				</Warp>
				<Text size="10px" color="#777777">
					<Warp flex="flex" direction="column" align="center">
						<div style={{marginBottom:"3px"}}>{day}</div>
						<div>{time}</div>
					</Warp>
				</Text>
			</AlertCard>
			<Rectangle/>

			{(num !== -1 && showModal) && (
        <Modal
          three
          setShowModal={setShowModal}
          modalData={modalData}
					updataBtn = {allow}
          deleteBtn={refuse}
        ></Modal>
      )}

		</React.Fragment>
	)
}


const Container = styled.div`
	width: 425px; 
	/* height: 177px; */
	/* margin: auto; */
`;

const AlertCard = styled.div`
	width: 100%;
	height: 72px;
	padding: 8px 10px 8px 10px;
	display: flex;
	justify-content: center;
	align-items: center;
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
`;

const Text = styled.div`
	font-size: ${(props) => props.size};
	font-weight: ${(props) => props.weight};
	line-height: ${(props) => props.height};
	color: ${(props) => props.color};
	letter-spacing: ${(props) => props.spacing};
	margin: ${(props) => props.margin};
	margin-bottom: ${(props) => props.bottom};
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