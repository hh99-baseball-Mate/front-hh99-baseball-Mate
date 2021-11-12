import React from "react"
import styled from "styled-components"
import BeatLoader from "react-spinners/BeatLoader"

export const Loading = () => {
  return (
    <>
      <LoadingBox>
        <P>
          로딩 중.. <br /> 잠시만 기다려주세요
        </P>
        <BeatLoader size="15px" color="#6242c1" />
      </LoadingBox>
    </>
  )
}

const LoadingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  width: 50%;
  margin: 0 auto;
  flex-direction: column;
`

const P = styled.div`
  font-size: 20px;
  line-height: 2;
  text-align: center;
  padding: 10px 0;
`
