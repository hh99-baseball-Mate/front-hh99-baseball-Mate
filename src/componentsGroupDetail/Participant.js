import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { groupDetailCreators } from "../redux/modules/groupDetail";


const Participant = (props) => {
	// const {shape, src, size, pointer} = props;
	// flex="felx" justify="space-around"
	const dispatch = useDispatch();

	const id = props.groupId;

	const apply = () => {
		dispatch(groupDetailCreators.groupApplyMW(id))
	}



	return (
		<React.Fragment>
			<Box padding="28px 20px 40px 20px">
				<Warp wrap="wrap" justify="space-between" align="center" start="space-around">
					{/* {
						props.peopleLimit.map((name,idx) => {
							return(
								<PartyList key={idx} name={name} />
							)
						})
					} */}
					<PartyList name={props.createdUserName}/>
				
				</Warp>

				<ConfirmBtn onClick = {()=>{apply()}} >
					참여신청하기 
				</ConfirmBtn>
			</Box>
		</React.Fragment>
	)
}

// 참여인원 컴포넌트
function PartyList(props) {
	return (
		<CircleBox>
			<Circle/>
			<Text>{props.name}</Text>
		</CircleBox>
	)
}


export default Participant;

const Box = styled.div`
	width: 100%;
	height: ${(props) => props.height};
	background: ${(props) => props.background};
	padding: ${(props) => props.padding};
	display: ${(props) => props.flex};
	flex-direction: ${(props) => props.direction};
	justify-content: ${(props) => props.justify};
	align-items: ${(props) => props.align};
	position: ${(props) => props.position};
`;

const Warp = styled.div`
	display: flex;
	width: ${(props) => props.width};
	flex-direction: ${(props) => props.direction};
	flex-wrap: ${(props) => props.wrap};
	justify-content: ${(props) => props.justify};
	align-items: ${(props) => props.align};
	align-content: ${(props) => props.start};
	margin-left: ${(props) => props.marginLeft};
	margin: ${(props) => props.margin};
	padding: ${(props) => props.padding};
	position: ${(props) => props.position};
	
`;

const Text = styled.div`
	font-size: ${(props) => props.size};
	font-weight: ${(props) => props.weight};
	color: ${(props) => props.color};
	letter-spacing: ${(props) => props.spacing};
	margin: ${(props) => props.margin};
	cursor: ${(props) => props.pointer};
	text-align: center;
`;

const CircleBox = styled.div`
	margin-bottom: 20px;
`;

const Circle = styled.div`
	width: 98px;
	height: 98px;
	border: 1px solid #F25343;
	border-radius: 50%;
	background: #FFFFFF;
	margin-bottom: 5px;
`;

const ConfirmBtn = styled.button`
	margin-top: 10px;
	width: 335px;
	height: 50px;
	background: #F25343;
	border-radius: 80px;
	border: none;
	color: #fff;
`;
