import React from "react"
import styled from "styled-components"
import { ArrowBack } from "../components"
import event from "../shared/icon/banner/event.png"

export const Event = () => {

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  return (
    <Container>
      <ArrowBack bg="true">이벤트</ArrowBack>
      <EventLogo src={event} alt="이벤트" />

      <a href="https://forms.gle/nVuVJ7xpLTB5mUBi8" target="_blank" >
        <Button1>
        </Button1>
      </a>

      <a href="/timeline" target="_blank" >
        <Button2>
        </Button2>
      </a>
  </Container>
  )
}

const Container = styled.div`
  width: 425px;
  position: relative;
`;

const EventLogo = styled.img`
width:425px`
  ;

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
`; 

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
`; 