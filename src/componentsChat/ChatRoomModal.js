import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { chatCreators } from "../redux/modules/chat";

const ChatRoomModal = (props) => {

  const dispatch = useDispatch();

  // 채팅방 나가기
  const leaveChat = () => {
    dispatch(chatCreators.leaveChatAX(props.postId))
  }

	return(
		<Background onClick={()=>{props.setModal(false)}}>
			<Container>
        <Text size="16px" weight="bold" marginB="20px">
          대화상대 
        </Text>

        <Warp marginB="10px" align="center">
          <CircleImg /> 
          <Circle>
            <Text color="#fff" size="10px">
              나
            </Text>
          </Circle>
          <Text>
            김태웅
          </Text>
        </Warp>

        {
          // Profile.map
        }
      
        {/* 하단고정 */}
        <Footer position="fixed">
          <Text onClick={()=>{leaveChat()}}>
            채팅방 나가기🔚
          </Text>
        </Footer>
      </Container>
		</Background>
	)
}
  

const Profile = (props) => {
  
  return(
    <div>

    </div>
  )
}

export default ChatRoomModal;



const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.65);
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  justify-content: flex-end;
  /* align-items: center; */
  z-index: 1;
`;

const Container = styled.div`
  width: 296px;
  height: 100vh;
  background-color: white;
  padding: 26px 20px;
`;

const Warp = styled.div`
  display: flex;
  width: ${(props) => props.width};
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  margin-left: ${(props) => props.marginLeft};
  margin-top: ${(props) => props.marginT};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  position: ${(props) => props.position};
  margin-bottom: ${(props) => props.marginB};
`;


const Text = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.color};
  letter-spacing: ${(props) => props.spacing};
  margin: ${(props) => props.margin};
  margin-bottom: ${(props) => props.marginB};
  line-height: ${(props) => props.lineHeight};
  
  /* display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden; */
`;

const CircleImg = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: #c4c4c4;
  border: 1px solid #E7E7E7;
  background-image: url(${(props) => props.url});
  /* background-size: contain; */
  background-size: cover;
  margin-right: 13px;
`;

const Circle = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #777777;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 6px;
`;

const Footer = styled.div`
  position: fixed;
  background-color: #fff2f2; /*임의색상*/
  width: inherit;
  padding: 20px;
  right: 0;
  bottom: 0;
  height: 60px;
`;
