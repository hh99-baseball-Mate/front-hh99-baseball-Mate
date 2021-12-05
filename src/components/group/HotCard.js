import React from "react"
import styled from "styled-components"
import { Progress,  } from "../../components/common"
import { Text, ImgKit } from "../../components/element"

import colorUsers from "../../shared/icon/colorUsers.svg"

export const HotCard = (props) => {
  const { canApplyNum, filePath, groupDate, peopleLimit, title, onClick } =
    props

  const img = process.env.REACT_APP_S3_GROUP_URL + filePath

  return (
    <CardBox onClick={onClick}>
      <CardContent>
        <ImgKit path="group" fileName={ filePath} width="240px" height="210px"/>
        <PostInfo>
          <Text size="12px" color="#777777">
            {groupDate}
          </Text>
          <Slice> &ensp;|&ensp; </Slice>

          <Text size="12px" color="#777777">
            최대{peopleLimit}명
          </Text>
        </PostInfo>

        <Title>{title}</Title>

        <People>
          <Progress />
          <People>
            <img src={colorUsers} alt="users" />
            <Text size="12px" color="#F25343" weight="bold" spacing="-0.03em;">
              &nbsp; {canApplyNum}명&nbsp;
            </Text>
            <Text size="12px" color="#F25343" spacing="-0.03em;">
              남음
            </Text>
          </People>
        </People>
      </CardContent>
    </CardBox>
  )
}

const CardBox = styled.li`
  margin: 0px 10px 0 0;
  background: #ffffff;
  height: 300px;
  cursor: pointer;
`
const PostInfo = styled.div`
  margin: 25px 0 3px;
  display: flex;
`

const CardContent = styled.div``

const Slice = styled.div`
  color: rgba(196, 196, 196, 0.3);
  font-size: 12px;
`

const Title = styled.p`
  font-size: 14px;
  width: 240px;
  height: 30px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 2;
`

const People = styled.div`
  display: flex;
  align-items: center;
  margin: 0 3px 0;
`
