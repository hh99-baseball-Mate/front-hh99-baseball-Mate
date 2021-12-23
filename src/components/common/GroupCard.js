import React, { memo, useEffect, useState } from "react"
import styled from "styled-components"
import { Progress } from "."

import colorUsers from "../../shared/icon/colorUsers.svg"
import { ImgKit } from "../element"

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

  const img = process.env.REACT_APP_S3_GROUP_URL + filePath

  // 모집중, 마감중 표시
  useEffect(() => {
    if (!allowtype || props.dday < 1 || props.canApplyNum === 0) {
      setClose(true)
    } else {
      setClose(false)
    }
  }, [close])

  return (
    <Container onClick={onClick}>
      <Card flex="flex">
        {/* <img src={img} /> */}
        <div style={{ width: "110px", height: "110px" }}>
          <ImgKit
            path="group"
            fileName={filePath}
            width="110px"
            height="110px"
          />
        </div>
        <Warp flex="flex" direction="column" width="100%" marginLeft="10px">
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
            size="13px"
            weight="bold"
            width="100%"
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
  margin: 5px 0;
  display: ${(props) => props.flex};
  /* box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.3); */
  padding: 5px;
  cursor: pointer;
  border-radius: 8px;
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
  font-size: 12px;
  color: ${(props) => props.color};
`

const Slice = styled.div`
  color: rgba(196, 196, 196, 0.3);
  font-size: 12px;
`
