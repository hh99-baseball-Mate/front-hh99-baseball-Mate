import React from "react"
import Image from "react-bootstrap/Image"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import { Text } from "../../components/element"
import { actionCreators as userActions } from "../../redux/modules/user"
import { clubImageSrc } from "../../shared/CSS/clubImage"

export const ClubImage = ({ historyPage }) => {
  const dispatch = useDispatch()

  const choiceClub = (e) => {
    dispatch(userActions.choiceClubMD(e.target.name, historyPage))
  }

  return (
    <>
      {clubImageSrc.map((src) => (
        <Choice key={src.id}>
          <Bg>
            <ClubImg
              src={src.img}
              style={{ width: "98px", padding: "10px" }}
              name={src.name}
              onClick={choiceClub}
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

const ClubImg = styled(Image)`
  :hover {
    cursor: pointer;
  }
`
