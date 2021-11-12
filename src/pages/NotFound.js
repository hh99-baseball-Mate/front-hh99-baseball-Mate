import React from "react"
import styled from "styled-components"
import { FcLock } from "react-icons/fc"
import { history } from "../redux/configStore"
import { Text } from "../components"

export const NotFound = () => {
  return (
    <>
      <Container>
        <Box>
          <FcLock size="30px" />
          <Text size="18px" bold>
            잘못된 페이지입니다.
          </Text>
        </Box>
        <Btn
          onClick={() => {
            history.goBack()
          }}
        >
          돌아가기
        </Btn>
      </Container>
    </>
  )
}

const Container = styled.div`
  /* width: 100vw; */
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* background-image: url("https://w.namu.la/s/eee9b43dca5cddcae2e05e0a90ab028242a71435d30c1a8db85351d4fd574330427b2e1fab0b4a6d3d4536120bd60c48c26b6fec04d92213f7a3f78e603b1707da464ef4dab6272f63200d7b952ec187"); */
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 0.9;
  /* align-items: center; */
`

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`

const Btn = styled.button`
  width: 200px;
  margin: 0 auto;
  /* border: none; */
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  background-color: #fff;
  border: 1px solid #e7e7e7;
  :hover {
    background-color: #ff6464;
    color: #fff;
  }
`
