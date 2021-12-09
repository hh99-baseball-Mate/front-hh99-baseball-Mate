import React from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import { Text, ImgKit } from "../../components/element"
import { actionCreators as userActions } from "../../redux/modules/user"
import { clubImageSrc } from "../../shared/CSS/clubImage"

export const ClubImage = ({ historyPage }) => {
  const dispatch = useDispatch()

  const choiceClub = (clubName) => {
    dispatch(userActions.choiceClubMD(clubName, historyPage))
  }

  return (
    <>
      {clubImageSrc.map((src) => (
        <Choice key={src.id}>
          <Bg onClick={() => choiceClub(src.name)}>
            <ImgKit
              path="clubImg"
              fileName={src.short_name}
              width="68px"
              height="68px"
            />
          </Bg>
          <Text>{src.name}</Text>
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
    transform: scale(120%);
    transition: 0.4s ease-in-out;
  }
`

const Bg = styled.div`
  border-radius: 50%;
  border: 1px solid #e7e7e7;
  background-color: transparent;
  margin-bottom: 5px;
`
