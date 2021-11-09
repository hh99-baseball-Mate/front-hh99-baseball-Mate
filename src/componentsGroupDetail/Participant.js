import React, { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { groupDetailCreators } from "../redux/modules/groupDetail";

import host from "../shared/icon/groupDetail/host.svg"


const Participant = memo((props) => {
console.log("참여자컴포", props)
	// const {shape, src, size, pointer} = props;
	// flex="felx" justify="space-around"
	const dispatch = useDispatch();

	const ip = "http://54.180.148.132/images/";
  const profileUrl = ip + props.appliedUserInfo[0].UserImage

	const id = props.groupId;

	const [join, setJoin] = useState(false);

	const apply = () => {
		if (!join) {
			dispatch(groupDetailCreators.groupApplyMW(id))
			setJoin(true)
			window.alert("참여가 완료되었습니다.")
		} else {
			setJoin(false)
			window.alert("참여가 취소됩니다.")
		}
	}

  // useEffect(() => {
  //   const groupLike = props.myGroupLikesList.indexOf(id)
  //   if (groupLike >= 0) {
  //     setHeartJoin(true)
  //   }
  // },[myGroupLikesList]) 

	return (
		<React.Fragment>
			<Box padding="28px 20px 40px 20px">
				<Warp wrap="wrap" justify="space-between" align="center" start="space-around">

					{/* 방장 */}
					<CircleBox>
						<HostCircle url={profileUrl} name={props.createdUserName}/>
						<Text>
							<img src={host} alt="host"/> {props.createdUserName}
						</Text>
					</CircleBox>

					{
						props.appliedUserInfo.slice(1).map((list,idx) => {
							return(
								<PartyList key={idx} {...list} />
							)
						})
					}
					
				
				</Warp>

					{/* 버튼 - 모집완료되면 모집마감 */}
					{/* 참여 신청, 취소 버튼 */}
					{
						props.close ?
						<DisableBtn disabled > 모집 마감 </DisableBtn> 
						:
						<ConfirmBtn onClick = {()=>{apply()}} join={join} >
						{
							join ? `참여 취소하기` : `참여 신청하기` 
						}
						</ConfirmBtn>
					}	
					
			</Box>
		</React.Fragment>
	)
})

// 참여인원 컴포넌트
function PartyList(props) {
	const ip = "http://54.180.148.132/images/";
	return (
		<CircleBox>
			<Circle url={ip + props.UserImage}/>
			<Text>{props.Username}</Text>
		</CircleBox>
	)
}

Participant.defaultProps = {
	appliedUserInfo: [{UserImage: 'sample.png', Username: '', UserId: '', UserInx: ''}],
	UserImage: "sample.png"
	
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

const HostCircle = styled.div`
	width: 98px;
	height: 98px;
	border: 2px solid #F25343;
	border-radius: 50%;
	background: #FFFFFF;
	margin-bottom: 5px;
	background-image: url(${(props) => props.url});
  /* background-size: contain; */
  background-size: cover;
`;

const Circle = styled.div`
	width: 98px;
	height: 98px;
	border: 1px solid #E7E7E7;
	border-radius: 50%;
	background: #FFFFFF;
	margin-bottom: 5px;
	background-image: url(${(props) => props.url});
  /* background-size: contain; */
  background-size: cover;
`;

const ConfirmBtn = styled.button`
	margin-top: 10px;
	width: 335px;
	height: 50px;
	background: #F25343;
	border-radius: 80px;
	border: none;
	color: #fff;

	${(props) =>
    props.join ?
    `background: #ff8787;`
		: `background: #F25343;`
	}
`;

const DisableBtn = styled.button`
	margin-top: 10px;
	width: 335px;
	height: 50px;
	background: #ced4da;
	border-radius: 80px;
	border: none;
	color: #fff;
`;
