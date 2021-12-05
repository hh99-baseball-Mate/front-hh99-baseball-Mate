import React, { useEffect } from "react"
import styled from "styled-components"
import { Container, ArrowBack } from "../../components/common"
import { Buttons, Text } from "../../components/element"
import { actionCreators as groupCr } from "../../redux/modules/group"
import { useDispatch, useSelector } from "react-redux"
import Position from "../../shared/icon/Vector.png"
import { history } from "../../redux/configStore"
import { Image } from "react-bootstrap"
import dayjs from "dayjs"


const GroupDate = (props) => {
  const dispatch = useDispatch()
  const play_list = useSelector((state) => state.group.play_list)

  //일정선택

  useEffect(() => {
    dispatch(groupCr.getPlayAPI())
  }, [])

  dayjs.locale("ko")
  const day = dayjs()

  // 경기 일자 2주치 모음
  let date = []

  // 2주일치 데이터 날짜 보여주기 위한 for문 하기
  for (let i = 0; i < 14; i++) {
    const addDate = day.add(i, "day").format("MM.DD (dd)")
    date.push(addDate)
  }

  // 필터로 2주일치 날짜를 뽑은거에 경기가 있는 날만 값 배열로 리턴받기
  const list = play_list.filter((e) => {
    return date.includes(e.date)
  })

  // 경기 날짜가 있는 날짜만 소팅
  const days = list.map((e) => {
    return e.date
  })

  // 경기가 있는 날짜 중 중복제거
  const gameDate = Array.from(new Set(days))

  return (
    <Container margin="0px auto">
      <ArrowBack>일정선택</ArrowBack>

      {/* 여기서부터 카드 */}
      {list && list.length > 0 ? (
        // 경기 날짜 세로 행 나열

        gameDate.map((d, i) => {
          return (
            <div key={i}>
              {/* 경기날짜 */}
              <Time>{d}</Time>

              {/* 커스텀 마이징 한 Swiper (overflow 사용) */}
              <Swipers>
                {/* 해당경기 날짜에 맞는 모든 경기 보여주기 가로행 */}

                {list.map((e, i) => {
                  if (e && e.date === d) {
                    return (
                      <Box
                        key={e.matchId}
                        onClick={() => {
                          dispatch(groupCr.datePage(e.result))
                          history.goBack()
                        }}
                      >
                        {/* 경기장소 / 시간 정보 */}
                        <Local>
                          <Text bold margin="0 0 7px">
                            {e.time}
                          </Text>
                          <img
                            src={Position}
                            alt="위치"
                            style={{
                              marginRight: "6px",
                            }}
                          />
                          {e.location}
                        </Local>

                        {/* 경기 구단 정보 홈 vs 어웨이 */}
                        <Card>
                          <Col>
                            <div>
                              <TeamImg
                                src={e.awayImage}
                                roundedCircle
                              ></TeamImg>
                            </div>

                            <div>{e.awayteam}</div>
                          </Col>
                          <Col>
                            <div>
                              <TeamImg src={e.homeImage} roundedCircle />
                            </div>

                            <div>{e.hometeam}</div>
                          </Col>
                        </Card>
                      </Box>
                    )
                  }
                })}
              </Swipers>
            </div>
          )
        })
      ) : (
        <NotGameList>
          경기가 없습니다
          <Buttons margin="30px 0" _onClick={() => history.goBack()}>
            돌아가기
          </Buttons>
        </NotGameList>
      )}
    </Container>
  )
}

export default GroupDate

const Box = styled.div`
  margin: 0 10px;
  width: 275px;
  height: 187px;
  background: #ffffff;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 20px;
  :focus {
    background-color: blue;
  }
`

const Local = styled.div`
  color: #777777;
  font-size: 12px;
`

const Col = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  min-width: 200px;
`

const Card = styled.div`
  margin-top: 21px;
`

const Time = styled.div`
  font-weight: bold;
  font-size: 17px;
  line-height: 20px;
  margin-top: 25px;
  /* margin-bottom: 11px; */
`

const NotGameList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 50vh;
`

const TeamImg = styled(Image)`
  width: 37px;
  height: 37px;
  background: #ffffff;
  border: 1px solid #e7e7e7;
  box-sizing: border-box;
  border-radius: 50%;
  /* marginRight: "4px", */
`

const Swipers = styled.div`
  overflow: auto hidden;
  display: flex;
  height: 210px;
  align-items: center;
`
