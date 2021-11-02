import React from "react"
import styled from "styled-components"
import { Text } from "../components"
import { FaRegSmileBeam } from "react-icons/fa"

export const Card = (props) => {
  const { defaultTitleImg, defaultUserImg } = props

  return (
    <CardBox>
      <CardContent>
        <MainImg src={defaultTitleImg} />
        <UserInfo>
          <CircleImg src={defaultUserImg} />
          <Text center bold>
            김진희
          </Text>
        </UserInfo>

        <TextBox>
          <Title>제목제목제목제목제목제목제목제목제목제목제목제목</Title>
          <Desc>
            제목제목제목제목제목제목제목제목제목제목제목제제목제제목제제목제제목제
            제목제
          </Desc>
        </TextBox>

        <IconBox>
          <Icons>
            <FaRegSmileBeam color="#171adc" style={{ marginRight: "5px" }} />
            <Text size="12px">1</Text>
          </Icons>
          <Text size="12px" color="#777777">
            2021-10-12
          </Text>
        </IconBox>
      </CardContent>
    </CardBox>
  )
}

Card.defaultProps = {
  defaultTitleImg:
    "https://martialartsplusinc.com/wp-content/uploads/2017/04/default-image-620x600.jpg",
  defaultUserImg:
    "https://solvus.net/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png",
}

const CardBox = styled.div`
  background: #ffffff;
  border: 1px solid #e7e7e7;
  box-sizing: border-box;
  border-radius: 10px;
  width: 160px;
  height: 300px;
  /* margin: 0 20px; */
`

const CardContent = styled.div`
  margin: 10px;
  height: 100%;
`

const MainImg = styled.img`
  width: 140px;
  height: 140px;
  background-color: #c4c4c4;
  border: 4px;
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e7e7e7;
`

const CircleImg = styled.img`
  width: 22px;
  height: 22px;
  background: #777777;
  border: 1px solid #e7e7e7;
  box-sizing: border-box;
  border-radius: 50%;
  margin-right: 5px;
`

const TextBox = styled.div`
  margin: 10px 0;
`

const Title = styled.p`
  font-size: 14px;
  width: 130px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Desc = styled.p`
  height: 32px;
  font-size: 12px;
  color: #c4c4c4;
  margin: 5px 0;
  line-height: 16px;
  overflow: hidden;
`

const IconBox = styled.div`
  display: flex;
  margin: 10px 0;
  justify-content: space-between;
`

const Icons = styled.div`
  display: flex;
`
