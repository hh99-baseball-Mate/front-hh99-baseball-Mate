import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import users from "../shared/icon/users.svg" 

const ChatCard = (props) => {

	const history = useHistory();

	return(
		<Container onClick={()=>{history.push("/chat/chatroom")}}>

			<Warp>

			<ImgBox url={""} />

			<Box>
				<Warp justify="space-between">
					{/* <Warp> */}
						<Warp>
							<Text size="14px" marginR="7px">
								야구봇
							</Text >
							<img src={users} alt="user"/>
							<Text marginL="4px">6</Text>
						</Warp>
					{/* </Warp> */}
					<Text color="#C4C4C4" size="10px">11:24</Text>
				</Warp>

				<Warp margin="7px 0 0 0" justify="space-between">
					<Text size="13px" width="280px" lineHeight="19px">
						안녕하세요~ 다들 그때 열심히 응원합시다안녕하세요~ 다들 그때 열심히 응원합시다안녕하세요~ 다들 그때 열심히 응원합시다
					</Text>
					<NumCircle></NumCircle>
				</Warp>
			</Box>

			</Warp>

		</Container>
	)
}

export default ChatCard;

const Container = styled.div`
  width: 425px;
	height: 90px;
  /* background-size: cover; */
  /* height: auto; */
  /* margin: 0 auto; */
  position: relative;
	padding: 15px 20px;
	border-bottom: 1px solid #E7E7E7;
`;

const ImgBox = styled.div`
  width: 60px;
  height: 60px;
	margin-right: 15px;
	border-radius: 4px;
  background-color: #c4c4c4;
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const Box = styled.div`
  width: 80%;
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
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.color};
  letter-spacing: ${(props) => props.spacing};
  margin: ${(props) => props.margin};
  margin-right: ${(props) => props.marginR};
  margin-left: ${(props) => props.marginL};
  line-height: ${(props) => props.lineHeight};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  /* white-space: nowrap; */
  text-overflow: ellipsis;
  overflow: hidden;
`;

const NumCircle = styled.div`
	width: 18px;
	height: 18px;
	border-radius: 50px;
	background: #F25343;
	color: #fff;
`;