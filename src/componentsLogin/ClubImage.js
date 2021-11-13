import React from "react"
import Image from "react-bootstrap/Image"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import { Text } from "../components"
import { history } from "../redux/configStore"
import { actionCreators as userActions } from "../redux/modules/user"
import { clubImageSrc, baseUrl } from "../shared/clubImage"

export const ClubImage = (props) => {
  const dispatch = useDispatch()

  const choiceClub = (e) => {
    // const formdata = new FormData()

    // formdata.append("myteam", e.target.className)

    // for (const keyValue of formdata) console.log(keyValue)
    dispatch(userActions.choiceClubMD(e.target.className))
    // console.log(e.target.className)
    // history.replace("/")
  }

  return (
    <>
      {clubImageSrc.map((src) => (
        <Choice key={src.id}>
          <Bg>
            <Image
              src={baseUrl + src.img}
              style={{ width: "98px", padding: "10px" }}
              className={src.name}
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