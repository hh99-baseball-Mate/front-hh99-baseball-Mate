import React, { useEffect } from "react";
import styled from "styled-components";
import { Buttons, Container, ArrowBack, Text } from "../components";
import { actionCreators as playCr } from "../redux/modules/group";
import { useDispatch, useSelector } from "react-redux";
import group from "../redux/modules/group";
import Position from "../shared/icon/Vector.png";
import { history } from "../redux/configStore";
import { Image } from "react-bootstrap";
// 스와이퍼

import { SwiperSlide, Swiper } from "swiper/react";

const GroupDate = (props) => {
  const dispatch = useDispatch();
  const play_list = useSelector((state) => state.group.play_list);
  console.log(play_list);

  useEffect(() => {
    dispatch(playCr.getPlayAPI());
  }, []);
  play_list.filter((e) => console.log(e.date));
  return (
    <Container margin="0px auto">
      <ArrowBack>일정선택</ArrowBack>
      {/* 여기서부터 카드 */}

      {play_list.map((e, i) => (
        <div key={i}>
          <Time>{e.date}</Time>

          {/* <Swiper>
        <SwiperSlide> */}
          <div
            style={{
              overflowX: "auto",
              display: "flex",
              height: "200px",
              alignItems: "center",
            }}
          >
            <Box>
              <Local>
                <Text bold margin="0 0 7px">
                  {e.time} {e.matchId}강
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
                    />
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
          </div>
          {/* </SwiperSlide>
      </Swiper> */}

          <div style={{ position: "fixed", width: "335px", bottom: "20px" }}>
            <Buttons complete>선택완료</Buttons>
          </div>
        </div>
      ))}
    </Container>
  );
};

export default GroupDate;

const Box = styled.div`
  width: 275px;
  height: 177px;
  background: #ffffff;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 20px;
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
  margin-bottom: 11px;
`;
