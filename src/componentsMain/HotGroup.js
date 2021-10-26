import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { mainCreators } from "../redux/reducer/main";


const HotGroup = (props) => {

	const dispatch = useDispatch();
	const hotGroup = useSelector((state) => (state.main.hotGroup))
	console.log("hotGroup",hotGroup)

	useEffect(() => {
		dispatch(mainCreators.hotGroupMW());
	}, [])

	return (
		<React.Fragment>
			<div style={{padding:"12px"}}>
				<p>지금 핫한 모임</p>

				{
					hotGroup.map((hot, idx)=>{
						return (
							<Card key={idx}>
								{hotGroup[idx].title}
								{hotGroup[idx].people}
							</Card>
						)
					})
				}

			</div>
		</React.Fragment>
	)
}

export default HotGroup;

const Card = styled.div`
	width: 100%;
	height: 100px;
	background-color: #ffc9c9;
	margin: 12px 0;
	border-radius: 10px;
`;