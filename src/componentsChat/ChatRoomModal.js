import React from "react";
import styled from "styled-components";

const ChatRoomModal = (props) => {

	return(
		<Background>
			<Container>
        
      </Container>
		</Background>
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
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const Container = styled.div`
  width: 296px;
  height: 100vh;
  background-color: white;
`;

const ModalContainer = styled.div`
  /* width: 384px; */
  /* border-radius: 30px; */
  background-color: white;
  width: 296px;
  height: 100vh;
  /* box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; */
  /* display: flex; */
  /* flex-direction: column; */
  /* border-width: 0; */
  /* padding: 25px; */
`;