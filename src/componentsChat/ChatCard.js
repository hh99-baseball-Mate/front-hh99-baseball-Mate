import React from "react";
import styled from "styled-components";

import users from "../shared/icon/users.svg" 

const ChatCard = (props) => {

	return(
		<Container>

			<Warp>

			<ImgBox url={""} />

			<div>
				<Warp justify="space-between">
					{/* <Warp> */}
						<Warp>
							<Text>야구봇</Text>
							<img src={users} alt="user"/>
							<Text>6</Text>
						</Warp>
					{/* </Warp> */}
					<Text>11:24</Text>
				</Warp>

				<Warp>
					<Text>안녕하세요~ 다들 그때 열심히 응원합시다</Text>
					<NumCircle></NumCircle>
				</Warp>
			</div>

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