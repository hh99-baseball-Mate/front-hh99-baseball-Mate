import React, { useEffect } from "react"
import { ClubImage } from "../componentsLogin/ClubImage"
import { Text, ArrowBack, Container } from "../components"
import styled from "styled-components"

export const ClubChoice = (props) => {
  return (
    <>
      <Container>
        <ArrowBack>구단선택</ArrowBack>

        {/* 선택 메세지 로그인 사용자 */}
        <TextBox>
          <Text size="20px" bold>
            내가 응원하는 <br />
            구단을 선택해주세요.
          </Text>
        </TextBox>

        {/* 구단선택 */}
        <Grid>
          {/* 클럽 이미지 */}
          <ClubImage />
        </Grid>
      </Container>
    </>
  )
}

ClubChoice.defaultPorps = {
  userNmae: "이름없음",
}

const TextBox = styled.div`
  margin: 49px 0px 38px;
  width: 178px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  place-items: center;
  gap: 15px;
  margin: 0 0 50px;
`
