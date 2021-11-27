import React, { memo, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";


const MessageBox = memo((props) => {
  // console.log("메세지박스", props)
  const sender_id = useSelector((state) => state.user.user_info?.useridx)

  // 사진 ip주소 + 사진이름 조합
  const IMAGES_BASE_URL = process.env.REACT_APP_IMAGES_BASE_URL
  const ip = IMAGES_BASE_URL
  const img = props.filePath
  const imageUrl = ip + img

  // 기본 로그인일 때 프로필 사진
  const profileImg = ip + props.senderImage

  // kakaocdn (카카오 프사인지 확인)
  const kakaoCheck = props.senderImage?.split(".")[1]
  const kakaoImg = props.senderImage

  const dayAndTime = props.modifiedAt.split(" ")
  const day = dayAndTime[0].split("-").join(".")
  const time = dayAndTime.slice(1, 3).join(" ")

  // 내가 보낸 메세지가 아닐 때
  if (props.senderId !== sender_id) {
    return (
      <Container>
        <Warp>
          <div>
            <ImgCircle
              marginR="7px"
              url={kakaoCheck === "kakaocdn" ? kakaoImg : profileImg}
            />
          </div>
          <Warp direction="column">
            <Text>{props.senderName}</Text>

            <Warp align="flex-end">
              <Talk>{props.message}</Talk>
              <Time>
                {/* 오전 10:34 */}
                <Warp direction="column" align="center">
                  <div>{day}</div>
                  <div>{time}</div>
                </Warp>
              </Time>
            </Warp>
          </Warp>
        </Warp>
      </Container>
    )
  }

  // 내가 보낸 메세지 일 때
  if (props.senderId === sender_id) {
    return (
      <Container>
        <Warp align="flex-end" direction="row-reverse">
          <MyTalk>{props.message}</MyTalk>
          <MyTime margin="0 3px 0 0">
            {/* {props.modifiedAt} */}
            <Warp direction="column" align="center">
              <div>{day}</div>
              <div>{time}</div>
            </Warp>
          </MyTime>
        </Warp>
      </Container>
    )
  }
})
export default React.memo(MessageBox);


const Container = styled.div`
  margin-bottom: 10px;
  max-width: 390px;
  position: relative;
`

const Box = styled.div`
  width: 385px;
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
	/* width: 100%; */
	display: flex;
	flex-direction: ${(props) => props.direction};
	justify-content: ${(props) => props.justify};
	align-items: ${(props) => props.align};
	margin-left: ${(props) => props.marginLeft};
	margin-bottom: ${(props) => props.bottom};
	margin: ${(props) => props.margin};
	margin-left: ${(props) => props.marginL};
	margin-right: ${(props) => props.marginR};
	padding: ${(props) => props.padding};
	position: ${(props) => props.position};
	/* right: -160px; */
`;

const Text = styled.div`
	font-size: ${(props) => props.size};
	font-weight: ${(props) => props.weight};
	color: ${(props) => props.color};
	letter-spacing: ${(props) => props.spacing};
	margin: ${(props) => props.margin};
	margin-bottom: ${(props) => props.bottom};
`;

const Time = styled.div`
	font-size: 8px;
	font-weight: ${(props) => props.weight};
	color: #777777;
	letter-spacing: ${(props) => props.spacing};
	margin: ${(props) => props.margin};
	margin-bottom: ${(props) => props.bottom};
	width: 70px;
	/* right: 10px;
	top: 30px; */
	/* padding: 12px 10px; */
`;

const ImgCircle = styled.div`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background: #FFFFFF;
	background-image: url(${(props) => props.url});
	background-repeat: no-repeat;
  background-position: center;
	background-size: cover;
	border: 1px solid #E7E7E7;
  display: flex;
  justify-content: center;
  align-items: center;
	margin-left: ${(props) => props.marginL};
	margin-right: ${(props) => props.marginR};
`;

const Talk = styled.div`
	max-width: 290px;
	min-width: 10px;
	background: #FFFFFF;
	border-radius: 0px 10px 10px 10px;
	padding: 10px 10px;
	/* position: absolute;
	left: 60px;
	top: 30px; */
	
	word-break: break-all;
`;

const Input = styled.input`
  width: 335px;
  height: 44px;
  border: 1px solid #E7E7E7;
  border-radius: 5px;
  padding: 14px 40px 14px 14px;
  ::placeholder {
    font-size: 14px;
    color: #C4C4C4;
  }
`;

const SendImg = styled.img`
  position: absolute;
  /* left: 8.34%; */
  right: 8px;
  bottom: 50%;
  transform: translateY(50%);
  cursor: pointer;
`;

/* 내가 보낸 메세지 */
const MyTalk = styled.div`
	max-width: 320px;
	min-width: 10px;
	background: #F25343;
	color: #FFFFFF;
	border-radius: 10px 0px 10px 10px;
	padding: 12px 10px;
	/* transform: matrix(-1, 0, 0, 1, 0, 0); */
	/* position: absolute;
	right: 0px;
	top: 30px; */
	word-break: break-all;
`;

const MyTime = styled.div`
	font-size: 8px;
	font-weight: ${(props) => props.weight};
	color: #777777;
	letter-spacing: ${(props) => props.spacing};
	margin: ${(props) => props.margin};
	margin-bottom: ${(props) => props.bottom};
	/* position: absolute; */
	/* right: 10px;
	top: 30px; */
	/* padding: 12px 10px; */
`;