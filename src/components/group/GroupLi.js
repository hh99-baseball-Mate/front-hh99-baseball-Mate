import React, { useState } from "react"
import { clubImageSrc } from "../../shared/CSS/clubImage"
import { Text, ImgKit } from "../../components/element/"
import styled from "styled-components"
import { useDispatch } from "react-redux"
import { actionCreators as groupCr } from "../../redux/modules/group"

const GroupLi = (props) => {
  const dispatch = useDispatch()

  return (
    <Container>
      {clubImageSrc.map((e) => (
        //  구단 별 swipers
        <ClubBox
          key={e.id}
          onClick={() => {
            dispatch(groupCr.datePage(""))
            props.selectTeam(e.name)
          }}
        >
          <div style={{ width: "54px", height: "54px" }}>
            <ImgKit
              path="clubImg"
              fileName={e.short_name}
              width="54px"
              height="54px"
            />
          </div>
          <Text size="8px" color="#717171" center>
            {e.name}
          </Text>
        </ClubBox>
      ))}
    </Container>
  )
}

const Container = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  place-items: center;
  gap: 5px;
  margin: 0 auto;
  width: 100%;

  border-top: 1px solid #c3c2c2f5;
  border-bottom: 1px solid #c3c2c2f5;
  padding: 10px 0;
`

const ClubBox = styled.li`
  /* margin-right: 16px; */
  cursor: pointer;
`

export default GroupLi
