import React from "react";
import styled from "styled-components";
import AlarmCard from "./AlarmCard";

const NormalAlarm = (props) => {

	// 일반 알람 찾기
	const normalAlarm = props.alarm.filter(list => list.alarmType === "Normal")
	// console.log(normalAlarm)



	return (
		<React.Fragment>

			{
				normalAlarm.map((list) => {
					return (
						<AlarmCard 
							key={list.id} 
							nomal
							{...list} 
							// requestList={requestList}
							// requestScreenList={requestScreenList}
						/>
					) 
				})
			}

		</React.Fragment>
	)
}

export default NormalAlarm;