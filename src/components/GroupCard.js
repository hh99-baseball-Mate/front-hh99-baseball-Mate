import React, { memo, useEffect, useState } from "react"
import styled from "styled-components"
import Progress from "./Progress"

import colorUsers from "../shared/icon/colorUsers.svg"

export const GroupCard = memo((props) => {
  const {
    onClick,
    filePath,
    dday,
    canApplyNum,
    groupDate,
    selectPlace,
    peopleLimit,
    title,
    hotPercent,
    allowtype,
  } = props

  const [close, setClose] = useState(false)

  const img = process.env.REACT_APP_IMAGES_BASE_URL + filePath

  // 모집중, 마감중 표시
  useEffect(() => {
    if (!allowtype || props.dday < 1 || props.canApplyNum === 0) {
      setClose(true)
    } else {
      setClose(false)
    }
  }, [close])
  // console.log("props.close", close)

  return (
    <Container onClick={onClick}>
      <Card flex="flex">
        <ImgBox url={img} />
        <Warp flex="flex" direction="column" width="250px" marginLeft="10px">
          <Warp flex="flex" margin="0 0 8px 0">
            {close ? (
              <Ellipse
                borderColor="#C4C4C4"
                background="#C4C4C4"
                color="#FFFFFF"
              >
                모집완료
              </Ellipse>
            ) : (
              <Ellipse
                borderColor="#F25343"
                background="#F25343"
                color="#FFFFFF"
              >
                모집중
              </Ellipse>
            )}

            {allowtype &&
            dday &&
            canApplyNum &&
            dday > 0 &&
            canApplyNum !== 0 ? (
              <Ellipse
                borderColor="#498C9A"
                background="#498C9A"
                color="#FFFFFF"
                marginLeft="4px"
              >
                D - {dday}
              </Ellipse>
            ) : (
              ""
            )}
          </Warp>

          <Warp flex="flex" marginB="4px">
            <Text size="10px" color="#777777">
              {groupDate}
            </Text>
            <Slice> &ensp;|&ensp; </Slice>

            {/* 지점명 */}
            {selectPlace && (
              <>
                <Text size="10px" color="#777777">
                  {selectPlace}
                </Text>
                <Slice> &ensp;| &ensp; </Slice>
              </>
            )}

            <Text size="10px" color="#777777">
              최대 {peopleLimit}명
            </Text>
          </Warp>

          <Text
            size="15px"
            weight="bold"
            width="250px"
            height="40px"
            lineHeight="20px"
            marginB="8px"
          >
            {title}
          </Text>

          <Warp
            flex="flex"
            justify="space-between"
            align="center"
            margin="0 0 0 0"
          >
            <Progress hotPercent={hotPercent} />
            <Warp flex="flex">
              <img src={colorUsers} alt="users" />
              <Text
                size="12px"
                color="#F25343"
                weight="bold"
                spacing="-0.03em;"
              >
                &nbsp;{canApplyNum}명&nbsp;
              </Text>
              <Text size="12px" color="#F25343" spacing="-0.03em;">
                남음
              </Text>
            </Warp>
          </Warp>
        </Warp>
      </Card>
    </Container>
  )
})

const Container = styled.div`
  width: 100%;
  margin: 10px 0;
  display: ${(props) => props.flex};
  cursor: pointer;
`

const Warp = styled.div`
  /* width: 100%; */
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: ${(props) => props.flex};
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  margin-left: ${(props) => props.marginLeft};
  margin-bottom: ${(props) => props.marginB};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  position: ${(props) => props.position};
`

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
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  /* white-space: nowrap; */
  text-overflow: ellipsis;
  overflow: hidden;
`

const Card = styled.div`
  max-width: 385px;
  display: ${(props) => props.flex};
  flex-direction: ${(props) => props.direction};
  background: #ffffff;
  position: relative;
  border-radius: 10px;
  box-sizing: border-box;
`

const Ellipse = styled.div`
  width: 50px;
  height: 24px;
  background: ${(props) => props.background};
  border: 1px solid ${(props) => props.borderColor};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 1px;
  margin-left: ${(props) => props.marginLeft};
  font-weight: bold;
  font-size: 11px;
  color: ${(props) => props.color};
`

const ImgBox = styled.div`
  width: 110px;
  height: 110px;
  border-radius: 4px;
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`

const Slice = styled.div`
  color: rgba(196, 196, 196, 0.3);
  font-size: 12px;
`
