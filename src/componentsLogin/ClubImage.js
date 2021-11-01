<<<<<<< HEAD
import React from "react";
import Image from "react-bootstrap/Image";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { history } from "../redux/configStore";
import { actionCreators as userActions } from "../redux/modules/user";
import { clubImageSrc, baseUrl } from "../shared/clubImage";

export const ClubImage = (props) => {
  const dispatch = useDispatch();
=======
import React from "react"
import Image from "react-bootstrap/Image"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import { history } from "../redux/configStore"
import { actionCreators as userActions } from "../redux/modules/user"
import { clubImageSrc } from "../shared/clubImage"

export const ClubImage = (props) => {
  const dispatch = useDispatch()

  const baseUrl = "https://www.thesportsdb.com/images/media/team/badge/"
>>>>>>> master

  const choiceClub = (e) => {
    dispatch(userActions.choiceClubMD(e.target.className));
    history.replace("/");
  };

  return (
    <>
      {clubImageSrc.map((src) => (
        <Choice key={src.id}>
          <Image
            src={baseUrl + src.img}
            style={{ width: "100%" }}
            className={src.name}
            onClick={choiceClub}
          />
        </Choice>
      ))}
    </>
  );
};

const Choice = styled.button`
  background-color: transparent;
  border: none;
  :hover {
    /* padding: 10px; */
    transform: scale(130%);
    transition: 0.3s ease-in-out;
  }
`;
