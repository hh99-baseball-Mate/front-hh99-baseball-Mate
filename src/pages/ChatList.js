import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";

import { ArrowBack, MarginBottom, NaviBar } from "../components";
import ChatCard from "../componentsChat/ChatCard";
import { chatCreators } from "../redux/modules/chat";

const ChatList = (props) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const chatList = useSelector((state) => state.chat?.chatList)

  useEffect(() => {
    dispatch(chatCreators.loadChatListMW())
  }, [chatList.newMessage])

  console.log("chatList", chatList.length)

  return (
    <React.Fragment>
      <ArrowBack background="background" fixed="fixed" margin="margin">
        채팅
      </ArrowBack>
      <Rectangle />

      <Box>
        {
          //채팅방 리스트
          chatList.map((list) => {
            return <ChatCard key={list.groupId} {...list} />
          })
        }
      </Box>

      {
        // 채팅방이 없으면 나옴
        chatList.length === 0 && (
          <Container position="absolute" top="50%" trans="translateY(-50%)">
            <Warp direction="column">
              <Text margin="auto">채팅 내역이 없습니다.</Text>
              <Button
                margin="auto"
                onClick={() => {
                  history.push("/mygroup")
                }}
              >
                나의 모임으로 이동하기
              </Button>
            </Warp>
          </Container>
        )
      }

      {/* <Box>
				<TimelineBtn onClick={()=>{history.push("/timeline")}}>
					채팅이 없으면 다른 사람들과 한 줄 생각을 나눠보세요
				</TimelineBtn>
			</Box> */}

      <MarginBottom />
      <NaviBar chat />
    </React.Fragment>
  )
}

export default ChatList

const Container = styled.div`
  width: 425px;
  /* background-size: cover; */
  /* height: auto; */
  /* margin: auto; */
  position: ${(props) => props.position};
  top: ${(props) => props.top};
  transform: ${(props) => props.trans};
`

const Rectangle = styled.div`
  background: #e7e7e7;
  width: 100%;
  height: 1px;
`

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
`

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
`

const Button = styled.button`
  width: 184px;
  height: 42px;
  margin: 15px auto;
  /* margin-top: 10px; */
  background: #fff;
  border-radius: 4px;
  border: 1px solid #f25343;
  color: #f25343;
  font-size: 14px;
`

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
`

const List = styled.div`
 	height: 550px;
	overflow: auto;
	/* NaviBar안겹치게 */
	/* margin-bottom: 94px; */
`;

const TimelineBtn = styled.button`
	position: absolute; 
	bottom:80px; 
  left: 50%;
  transform: translateX(-50%);
`;