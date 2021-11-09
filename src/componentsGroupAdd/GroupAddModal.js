import React from "react"
import styled from "styled-components"
import { Buttons, Container, Text } from "../components"
import { Modal } from "../components/Modal"
import { GrLocation } from "react-icons/gr"

export const GroupAddModal = ({
  setGroupDate,
  selectTeam_list,
  setShowModal,
}) => {
  // if (!close) {
  console.log(selectTeam_list.length)
  return (
    <Modal bottom height="480px">
      {/* 내부 영역 지정 */}
      <Container>
        {selectTeam_list && selectTeam_list.length > 0 ? (
          selectTeam_list.map((list) => (
            <Card
              key={list.matchId}
              onClick={() => {
                setGroupDate(
                  list.date +
                    " " +
                    list.time +
                    " " +
                    list.location +
                    " " +
                    list.hometeam +
                    " vs " +
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
          ))
        ) : (
          <NotGame>
            경기가 없습니다
            <Buttons margin="50px" _onClick={() => setShowModal(false)}>
              돌아가기
            </Buttons>
          </NotGame>
        )}
      </Container>
    </Modal>
  )
  // }
}

GroupAddModal.defaultProps = {
  children: null,
}

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

const NotGame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  flex-direction: column;
  font-size: 30px;
`
