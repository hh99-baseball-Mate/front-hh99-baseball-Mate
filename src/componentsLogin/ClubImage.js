import React, { useState } from "react"
import Image from "react-bootstrap/Image"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import { history } from "../redux/configStore"
import { actionCreators as userActions } from "../redux/modules/user"

export const ClubImage = (props) => {
  const dispatch = useDispatch()

  const baseUrl = "https://www.thesportsdb.com/images/media/team/badge/"

  const clubImageSrc = [
    { id: 1, name: "한화", img: "u5t0x01589709824" },
    { id: 2, name: "두산", img: "e96s4z1589709054" },
    { id: 3, name: "기아", img: "pesj9z1589709516" },
    { id: 4, name: "키움", img: "qcj18p1589709259" },
    { id: 5, name: "케이티", img: "qk8erg1589709962" },
    { id: 6, name: "롯데", img: "l9quje1589708840" },
    { id: 7, name: "엘지", img: "vvii3b1589708608" },
    { id: 8, name: "삼성", img: "5u6k511589709673" },
    { id: 9, name: "신세계", img: "49cfnl1623632712" },
    { id: 10, name: "엔씨", img: "6gwcg81589708218" },
  ]

  const choiceClub = (e) => {
    dispatch(userActions.choiceClubMD(e.target.className))
    // history.push("/")
  }

  return (
    <>
      {clubImageSrc.map((src) => (
        <Choice key={src.id}>
          <Image
            src={baseUrl + src.img + ".png"}
            style={{ width: "100%" }}
            className={src.name}
            onClick={choiceClub}
          />
        </Choice>
      ))}
    </>
  )
}

const Choice = styled.button`
  background-color: transparent;
  border: none;
  :hover {
    /* padding: 10px; */
    transform: scale(130%);
    transition: 0.3s ease-in-out;
  }
`
