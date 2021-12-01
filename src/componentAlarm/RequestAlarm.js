import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { alarmCreators } from "../redux/modules/alarm";
import { Modal } from "../components/Modal"
import AlarmCard from "./AlarmCard";

const RequestAlarm = (props) => {

	const dispatch = useDispatch()
  // console.log("RequestAlarm", props)


	// 직관,스야 알람 찾기
	const request = props.alarm.filter(list => !(list.alarmType === "Normal"))
	// console.log(request)

	// 경기모임(방장이 참여자들을)승인 요청 목록
	const requestList = useSelector((state) => state.alarm?.requestList)

	// 스크린야구 (방장이 참여자들을)승인 요청 목록
	const requestScreenList = useSelector(
		(state) => state.alarm.requestScreenList
	)

	useEffect(() => {
    dispatch(alarmCreators.requestChatListMW())
    dispatch(alarmCreators.requestScreenChatListMW())
  }, [])


	return (
    <React.Fragment>

			{
				request.map((list) => {
					return (
						<AlarmCard 
							key={list.id} 
							request
							{...list} 
							requestList={requestList}
							requestScreenList={requestScreenList}
						/>
					) 
				})
			}

    </React.Fragment>
	)
}

export default RequestAlarm;


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