import React, { useState } from "react";
import styled from "styled-components";
import { Text } from "../components";

const CommentList = (props) => {
  return (
    <div>
      <Box position="relative" background="#ffffff">
        <Wrap>
          <div>
            <Circle marginTop="26px" />
            <Box margin="20px 20px 20px 14px">
              <Wrap align="center">
                <Text size="14px" bold margin="0 10px 0 0">
                  유저네임
                </Text>
                <Text color="#c4c4c4" size="12px"></Text>
              </Wrap>
            </Box>
          </div>
        </Wrap>
      </Box>
    </div>
  )
};

export default CommentList;

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

const Wrap = styled.div`
  display: flex;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
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

const Circle = styled.div`
  width: 29px;
  height: 29px;
  border-radius: 50%;
  background: #c4c4c4;
  border: 1px solid #e7e7e7;
  margin-top: ${(props) => props.marginTop};
  margin-left: 20px;
  background-image: url(${(props) => props.url});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;
