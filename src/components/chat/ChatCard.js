import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";


import users from "../../shared/icon/users.svg"

const ChatCard = (props) => {
  const history = useHistory();

  // 사진 받아오기
  const IMAGES_BASE_URL = process.env.REACT_APP_S3_GROUP_URL;
  const ip = IMAGES_BASE_URL;

  const roomId = props.roomId;

  return (
    <Container
      onClick={() => {
        history.push("/chatlist/chatroom/" + roomId);
      }}
    >
      <Warp>
        <ImgBox url={ip + props.chatRoomImage} />

        <Box>
          <Warp justify="space-between">
            {/* <Warp> */}
            <Warp>
              <Text size="14px" marginR="7px">
                {props.chatRoomtype === "group" ? (
                  <Ellipse
                    borderColor="#F25343"
                    background="#F25343"
                    color="#FFFFFF"
                  >
                    경기모임
                  </Ellipse>
                ) : (
                  <Ellipse
                    borderColor="#F25343"
                    background="#FFF"
                    color="#F25343"
                  >
                    스야모임
                  </Ellipse>
                )}
              </Text>
              <img src={users} alt="user" />
              <Text marginL="4px">{props.headCountChat}</Text>
            </Warp>
            {/* </Warp> */}
            {/* <Text color="#C4C4C4" size="10px">11:24</Text> */}
          </Warp>

          <Warp margin="7px 0 0 0" justify="space-between">
            <Text size="16px" weight="bold" width="280px" lineHeight="19px">
              {props.title}
            </Text>

            {
              // 새로운 알림
              props.newMessage && <NumCircle></NumCircle>
            }
          </Warp>
        </Box>
      </Warp>
    </Container>
  );
};

export default ChatCard;

const Container = styled.div`
  max-width: 425px;
  width: 100%;
  height: 90px;
  /* background-size: cover; */
  /* height: auto; */
  /* margin: 0 auto; */
  position: relative;
  padding: 15px 20px;
  border-bottom: 1px solid #e7e7e7;
  :hover {
    background-color: rgba(255, 249, 233, 1);
  }
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
  background: #f25343;
  color: #fff;
`;

const Ellipse = styled.div`
  width: 55px;
  height: 24px;
  background: ${(props) => props.background};
  border: 1px solid ${(props) => props.borderColor};
  border-radius: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 1px;
  margin-left: ${(props) => props.marginLeft};
  font-weight: bold;
  font-size: 12px;
  color: ${(props) => props.color};
`;
