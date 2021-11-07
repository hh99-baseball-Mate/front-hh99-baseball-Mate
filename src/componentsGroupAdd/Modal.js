import React from "react"
import styled, { keyframes } from "styled-components"
import { Container, Text } from "../components"
import { GrLocation } from "react-icons/gr"

export const Modal = ({ setGroupDate, selectTeam_list, setShowModal }) => {
  // if (!close) {

  return (
    <ModalContainer>
      <Modals>
        {/* 내부 영역 지정 */}
        <Container>
          {selectTeam_list.map((list) => (
            <Card
              key={list.matchId}
              onClick={() => {
                setGroupDate(
                  list.date +
                    " " +
                    list.time +
                    " " +
                    list.hometeam +
                    " VS " +
                    list.awayteam
                )
                setShowModal(false)
              }}
            >
              <Text size="17px" margin="0 0 8px 0" bold>
                {list.date}
              </Text>

              {/* 게임정보 */}
              <GameInfo>
                {/* 날짜 박스 */}
                <DateBox>
                  {/* 날짜 */}
                  <Text size="13px" margin="0 0 5px 0">
                    {list.time}
                  </Text>

                  {/* 시간 박스(텍스트) */}
                  <TextBox>
                    {/* 위치 아이콘 */}
                    <GrLocation size="12px" />

                    {/* 구장 */}
                    <Text size="12px">{list.location}</Text>
                  </TextBox>
                </DateBox>

                {/* 구단 이미지 */}
                <ImgBox>
                  {/* 홈 */}
                  <Bg>
                    <img
                      src={list.awayImage}
                      style={{ width: "37px" }}
                      alt="홈팀"
                    />
                  </Bg>
                  <Text>VS</Text>
                  {/* 원정 */}
                  <Bg>
                    <img
                      src={list.homeImage}
                      style={{ width: "37px" }}
                      alt="원정팀"
                    />
                  </Bg>
                </ImgBox>
              </GameInfo>
            </Card>
          ))}
        </Container>
      </Modals>
    </ModalContainer>
  )
  // }
}

Modal.defaultProps = {
  children: null,
}

const showModal = keyframes`
  0%{
    transform: translateY(80%);
  }50%{
    transform: translateY(0%);
  }
`

const ModalContainer = styled.div`
  width: 375px;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 99;
  position: fixed;
  bottom: 0;
  margin: 0 -20px;
`
const Modals = styled.div`
  width: 375px;
  height: 490px;
  background-color: #ffffff;
  position: absolute;
  bottom: 0px;
  border-radius: 10px 10px 0px 0px;
  animation: ${showModal} 1.5s ease-out;
  overflow-y: auto;
`

const GameInfo = styled.div`
  border: 1px solid #e7e7e7;
  box-sizing: border-box;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
`

const Card = styled.div`
  margin: 30px 0 0;
  :last-child {
    margin: 30px 0 30px;
  }
`
const DateBox = styled.div`
  margin: 9px 12px;
`
const TextBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Bg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 1px solid #e7e7e7;
  background-color: transparent;
  margin: 7px 10px;
`

const ImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
