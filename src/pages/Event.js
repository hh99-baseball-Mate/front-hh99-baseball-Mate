import React from "react"
import styled from "styled-components"
import { ArrowBack } from "../components"
import event from "../shared/icon/banner/event.png"

export const Event = () => {
  return(
    <>
    <ArrowBack bg="true">이벤트</ArrowBack>
    <EventLogo src={event} alt="이벤트" />
  </>)
}

const EventLogo = styled.img`
width:425px`
  ;