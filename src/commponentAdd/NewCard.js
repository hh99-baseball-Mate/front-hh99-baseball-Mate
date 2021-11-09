import React from "react";
import styled from "styled-components";
import { Image } from "react-bootstrap";
import { Progress } from "../components";
import colorUsers from "../shared/icon/colorUsers.svg";
import More from "../shared/icon/more.svg";

const NewCard = (props) => {
  const leftPeople = props.peopleLimit - props.canApplyNum;
  return (
    <div>
      <Box>
        <Warp flex="flex">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxDZ4WmsvL0lvEzv8UrFD3zGtNw6FLWLNr9Q&usqp=CAU"
            rounded
            style={{
              width: "76px",
              height: "76px",
              borderRadius: "6px",
              margin: "16px",
            }}
          />
          <img src={More} alt="위치" />

          <Warp style={{ marginTop: "16px" }}>
            <Warp>
              <Text size="12px" color="#777777">
                {props.groupDate}
              </Text>
            </Warp>
            <Warp>
              <Text
                size="14px"
                weight="bold"
                width="191px"
                height="40px"
                lineHeight="14px"
                display="relative"
                marginLeft="12px"
              >
                {props.title}안에 내용이다
              </Text>
            </Warp>
            <Warp flex="flex">
              <Text size="12px" color="#777777">
                {props.groupDate}
              </Text>
              <Slice> &ensp;|&ensp; </Slice>
              <Text size="12px" color="#777777">
                {props.stadium}
              </Text>
              <Slice> &ensp;|&ensp; </Slice>
              <Text
                size="12px"
                color="#777777"
                style={{ marginBottom: "8px " }}
              >
                최대 {props.peopleLimit}명
              </Text>
            </Warp>
          </Warp>
        </Warp>
        <Warp
          flex="flex"
          justify="space-between"
          align="center"
          margin="0 0 0 16px"
        >
          <Progress group={props} />
          <Warp flex="flex">
            <img src={colorUsers} alt="users" />
            <Text size="12px" color="#F25343" weight="bold" spacing="-0.03em;">
              &nbsp;{leftPeople}명&nbsp;
            </Text>

            <Text size="12px" color="#F25343" spacing="-0.03em;">
              남음
            </Text>
          </Warp>
        </Warp>
      </Box>
    </div>
  );
};

export default NewCard;

const Box = styled.div`
  width: 335px;
  height: 134px;
  margin: 0 auto;
  margin-bottom: 14px;

  background: #ffffff;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
`;

const Warp = styled.div`
  /* width: 100%; */
  display: ${(props) => props.flex};
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
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

const Up = styled.p`
  size: 14px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Btn = styled.button`
  width: 75px;
  height: 25px;
  border-radius: 35%;
  background: none;
  border-color: #c4c4c4;
  font-size: 14px;
  display: flex;
`;

const Slice = styled.div`
  color: rgba(196, 196, 196, 0.3);
  font-size: 12px;
`;
