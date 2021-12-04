import React from "react"
import styled from "styled-components"
import { ArrowBack } from "../../components/common"
import event from "../../shared/icon/banner/event.png"
import { history } from "../../redux/configStore"

export const Event = () => {
  return (
    <Container>
      <ArrowBack bg="true">이벤트</ArrowBack>
      <EventLogo src={event} alt="이벤트" />

      <a href="https://forms.gle/nVuVJ7xpLTB5mUBi8" target="_blank">
        <Button1></Button1>
      </a>

      <div onClick={() => history.push("/timeline")}>
        <Button2></Button2>
      </div>
    </Container>
  )
}

const Container = styled.div`
  max-width: 425px;
  width: 100%;
  position: relative;
`

const EventLogo = styled.img`
  max-width: 425px;
  width: 100%;
`

const Button1 = styled.button`
  position: absolute;
  z-index: 1;
  left: 50%;
  top: 1790px;
  transform: translateX(-50%);
  width: 380px;
  height: 53px;
  /* margin: auto; */
  background: none;
  cursor: pointer;
`

const Button2 = styled.button`
  position: absolute;
  z-index: 1;
  left: 50%;
  top: 2525px;
  transform: translateX(-50%);
  width: 380px;
  height: 53px;
  /* margin: auto; */
  background: none;
  cursor: pointer;
`
