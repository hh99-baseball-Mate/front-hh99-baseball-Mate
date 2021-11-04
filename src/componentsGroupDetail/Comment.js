import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { getCookie } from '../shared/Cookie';
import { groupDetailCreators } from "../redux/modules/groupDetail";

import smail from "../shared/icon/smail.svg"
import unSmail from "../shared/icon/unSmail.svg"
import more from "../shared/icon/more.svg"
import send from "../shared/icon/send.svg"


const Comment = (props) => {
	
	const dispatch = useDispatch();
	const history = useHistory();
	const cookie = getCookie("is_login");

	const [message, setMessage] = useState("");

  const addComment = () => {
    if (!cookie) {
      window.alert("로그인 후 이용해주세요");
      history.push("/login")
      return;
    }
    else if (message !== "") {
      dispatch(groupDetailCreators.addCommentMW(message));
      setMessage("");
      return;
    } 
    else {
      window.alert("내용을 입력하세요")
      return;
    }
  };

	return (
		<React.Fragment>
			<Box padding="13px 20px 13px 20px">
				<Warp justify="space-between">
					<Text size="14px" color="#777777">
						방명록 7
					</Text>

					<Warp>
						<Text marginR="5px" size="14px" weight="500" color="#C4C4C4">
							인기순
						</Text>
						<Text marginR="5px" size="14px" weight="500" color="#C4C4C4">
							최신순
						</Text>
					</Warp>
				</Warp>
			</Box>

			<Rectangle/>

			<Box height="42px" background="#F6F6F6" flex="flex" justify="center" align="center" >
				<Text color="#C4C4C4" size="14px">
					방명록을 사용할 때는 욕설과 ~~ 삼가해주시기 바랍니다.
				</Text>
			</Box>

			<Box height="69px" position="relative">
				<Warp>
					<div>
						<Circle marginT="20px"/>
					</div>
					<TextArea placeholder="공개글 추가..." 
						value={message}
						onChange={(e) => {
							setMessage(e.target.value);
						}}
					/>
				</Warp>
					<SendImg src={send} alt="send"
							onClick={() => {addComment()}}
						/>
			</Box>

			<Rectangle/>
			
			<Box>
				<Warp>
					<div>
						<Circle marginT="26px" />
					</div>

					<Box margin="20px 20px 20px 14px">
						<Warp align="center">
							<Text size="14px" weight="bold" marginR="10px">
								김진희
							</Text>
							<Text color="#C4C4C4" size="12px">
								1분전
							</Text>
						</Warp>
						<Text size="14px">
							지금 참여 가능 하신가요?
						</Text>

						<Warp marginT="18px">
							<Icon src={smail} alt="smail" marginR="7px" /> 
							<Text size="12px" marginR="30px">1</Text>
							<Icon src={unSmail} alt="unSmail" marginR="7px" />
							<Text size="12px">0</Text>
						</Warp>
					</Box>
					
					<Icon src={more} alt="more" marginT="-34px" marginR="22px" />

				</Warp>
			</Box>
			<Rectangle/>

		</React.Fragment>	
	)
}

export default Comment;

const Rectangle = styled.div`
	background: #C4C4C4;
	width: 100%;
	border: 1px solid #E7E7E7;
`;

const Box = styled.div`
	width: 100%;
	height: ${(props) => props.height};
	background: ${(props) => props.background};
	padding: ${(props) => props.padding};
	margin: ${(props) => props.margin};
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
	margin-top: ${(props) => props.marginT};
	margin: ${(props) => props.margin};
	padding: ${(props) => props.padding};
	position: ${(props) => props.position};
	
`;

const Text = styled.p`
	font-size: ${(props) => props.size};
	font-weight: ${(props) => props.weight};
	color: ${(props) => props.color};
	letter-spacing: ${(props) => props.spacing};
	margin: ${(props) => props.margin};
	margin-right: ${(props) => props.marginR};
	cursor: ${(props) => props.pointer};
	line-height: ${(props) => props.height};
	/* text-align: center; */
`;

const NowBtn = styled.button`
	width: 187px;
	height: 45px;
	margin-right: 0;
	padding-bottom: 20px;
	border: none;
	border-bottom: 3px solid #F25343;
	background: none;
`;

const Button = styled.button`
	width: 187px;
	height: 45px;
	background: none;
	padding-bottom: 20px;
	border: none;
`;

const TextArea = styled.textarea`
  width: 350px;
  height: 70px;
	border: none;
  /* border: 1px solid #E7E7E7; */
  /* border-radius: 100px; */
  padding: 12px 40px 12px 16px;
  margin-left: 12px;
	resize: none;
	:required
  /* position: relative; */
  ::placeholder {
    font-weight: 500;
    font-size: 14px;
    color: #C4C4C4;
  }
`;

const Circle = styled.div`
	width: 29px;
	height: 29px;
	border-radius: 50%;
	background: #C4C4C4;
	margin-top: ${(props) => props.marginT};
	margin-left: 20px;
`;

const Icon = styled.img`
	margin-top: ${(props) => props.marginT};
	margin-right: ${(props) => props.marginR};
`;

const SendImg = styled.img`
  position: absolute;
  /* left: 8.34%; */
  right: 8px;
  bottom: 50%;
  transform: translateY(50%);
  cursor: pointer;
`;