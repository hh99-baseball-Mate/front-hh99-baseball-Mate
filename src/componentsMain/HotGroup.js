import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { mainCreators } from "../redux/modules/mainPage";


const HotGroup = (props) => {

	const dispatch = useDispatch();
	const hotGroup = useSelector((state) => (state.mainPage.hotGroup))
	console.log("hotGroup",hotGroup)

	useEffect(() => {
		dispatch(mainCreators.hotGroupMW());
	}, [])

	return (
		<React.Fragment>
			<Warp>
				<Box style={{padding:"12px"}}>
					<Flexdiv margin="20px">
						<p1>지금 핫한 모임</p1>
						<p2>전체보기</p2>
					</Flexdiv>

					{
						hotGroup.map((hot, idx)=>{
							return (
								<Card key={idx}>
									<Flexdiv>
										<ProfileImg />
										<Title>{hotGroup[idx].title}</Title>
									</Flexdiv>
									<Flexdiv>
										<Flexdiv>
											<p>21.11.22</p>
											<p>롯데</p> 
										</Flexdiv>
										참가하기
									</Flexdiv>
								</Card>
							)
						})
					}

				</Box>
			</Warp>
		</React.Fragment>
	)
}

export default HotGroup;

const Flexdiv = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: ${(props) => props.margin};
`;

const Warp = styled.div`
	width: 327px;	
	margin: auto;
`;

const Box = styled.div`
	margin-top: 44px;
	font-weight: 700;
	font-size: 18px;
	p1 {
		color: #888989;
	}
	p2 {
		font-size: 13px;
		font-weight: normal;
		color: #C4C4C4;
	}
`;

const Card = styled.div`
	width: 100%;
	height: 115px;
	background-color: #ffc9c9;
	margin-bottom: 25px;
	padding: 15px 12px;
	background: #FAFAFA;
	box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
	border-radius: 10px;
	border-radius: 10px;
	/* div {
		display: flex;
	} */
`;

const ProfileImg = styled.div`
	width: 50px;
	height: 50px;
	border-radius: 50%;
	/* margin-right: 14px; */
	background-color: wheat;
	/* background: url(.png); */
`;

const Title = styled.div`
	width: 230px;
	margin-left: 12px;
`;