import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Buttons, Container, ArrowBack, Text } from "../components";
import { actionCreators as groupCr } from "../redux/modules/group"
import { useDispatch, useSelector } from "react-redux"
import Position from "../shared/icon/Vector.png"
import { history } from "../redux/configStore"
import { Image } from "react-bootstrap"
// 스와이퍼

const GroupDate = (props) => {
  const dispatch = useDispatch()
  const play_list = useSelector((state) => state.group.play_list)

  //일정선택

  useEffect(() => {
    dispatch(groupCr.getPlayAPI())
  }, [])

  const _day = new Date()

  const year = _day.getFullYear()
  const month = new Date().getMonth() + 1
  const day = new Date().getDay()

  // 예시 날짜
  // const month = 10
  // const day = 15

  let date = []

  const week = ["(일)", "(월)", "(화)", "(수)", "(목)", "(금)", "(토)"]

  // 2주일치 데이터 날짜 ++ 하기
  for (let i = 0; i < 14; i++) {
    const _date = String(month) + "." + String(day + i)
    date.push(_date + " " + week[new Date(year + "." + _date).getDay()])
  }
  // 필터로 일주일치 날짜를 뽑은거에 해당하는 값 배열로 리턴받기
  const list = play_list.filter((e) => {
    return date.includes(e.date)
  })

  // console.log(list);
  return (
    <Container margin="0px auto">
      <ArrowBack>일정선택</ArrowBack>
      {/* 여기서부터 카드 */}
      {list && list.length > 0 ? (
        list.map((d, i) => {
          return (
            <div key={i}>
              <Time>{d.date}</Time>

              <div
                style={{
                  overflow: "auto hidden",
                  display: "flex",
                  height: "210px",
                  alignItems: "center",
                }}
              >
                {list.map((e, i) => {
                  if (e && e.date === d.date) {
                    return (
                      <Box
                        key={e.matchId}
                        // name={e.matches}
                        onClick={() => {
                          dispatch(groupCr.datePage(e.result))
                          history.goBack()
                        }}
                      >
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

                        <Card>
                          <Col>
                            <div>
                              <Image
                                src={e.awayImage}
                                roundedCircle
                                style={{
                                  width: "37px",
                                  height: "37px",
                                  background: "#FFFFFF",
                                  border: "1px solid #E7E7E7",
                                  boxSizing: "border-box",
                                  borderRadius: "50%",
                                }}
                              ></Image>
                            </div>

                            <div>{e.awayteam}</div>
                          </Col>
                          <Col>
                            <div>
                              {" "}
                              <Image
                                src={e.homeImage}
                                roundedCircle
                                style={{
                                  width: "37px",
                                  height: "37px",
                                  background: "#FFFFFF",
                                  border: "1px solid #E7E7E7",
                                  boxSizing: "border-box",
                                  borderRadius: "50%",
                                  marginRight: "4px",
                                }}
                              />
                            </div>

                            <div>{e.hometeam}</div>
                          </Col>
                        </Card>
                      </Box>
                    )
                  }
                })}
              </div>
            </div>
          )
        })
      ) : (
        <NotGameList>
          경기가 없습니다
          <Buttons margin="30px 0">돌아가기</Buttons>
        </NotGameList>
      )}
    </Container>
  )
}

export default GroupDate;

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
`;

const Local = styled.div`
  color: #777777;
  font-size: 12px;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  min-width: 200px;
`;

const Card = styled.div`
  margin-top: 21px;
`;

const Time = styled.div`
  font-weight: bold;
  font-size: 17px;
  line-height: 20px;
  margin-top: 25px;
  /* margin-bottom: 11px; */
`;

const NotGameList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 50vh;
`;
