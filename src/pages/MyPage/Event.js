import React from "react"
import styled from "styled-components"
import { ArrowBack } from "../../components/common"
import event from "../../shared/icon/banner/event.png"
import { history } from "../../redux/configStore"

const Event = () => {
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

export default Event

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
  top: 61.75%;
  transform: translateX(-50%);
  width: 89.5%;
  height: 1.75%;
  /* margin: auto; */
  background: none;
  cursor: pointer;
  @media screen and (max-width : 385px) {
    top: 61.9%;
  }
`

const Button2 = styled.button`
  position: absolute;
  z-index: 1;
  left: 50%;
  top: 87.13%;
  transform: translateX(-50%);
  width: 89.5%;
  height: 1.77%;
  /* margin: auto; */
  background: none;
  cursor: pointer;
`
