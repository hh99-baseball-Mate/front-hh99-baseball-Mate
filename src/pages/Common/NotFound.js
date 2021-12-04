import React from "react"
import styled from "styled-components"
import { FcLock } from "react-icons/fc"
import { history } from "../../redux/configStore"
import { Text } from "../../components/element"

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
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 0.9;
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
